import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = new URL('../', import.meta.url);
function load(file) {
  const compiled = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL(`${file}.ts`, root), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'module', 'exports', code)(name => {
    if (name === 'server-only') return {};
    if (name.startsWith('@/')) return load(name.slice(2));
    if (name.startsWith('./')) return load(path.posix.join(path.posix.dirname(file), name));
    return require(name);
  }, compiled, compiled.exports);
  return compiled.exports;
}
const { CLIENTS } = load('data/clients');
const { CASE_STUDIES_DATA, TESTIMONIALS_DATA } = load('data/mockData');
const { adminMockData } = load('data/admin/mockData');
const { adminSections } = load('lib/admin/sections');
const { createClientStore } = load('lib/clients/storage');
const { upsertClient } = load('lib/clients/model');

test('all six client identities and categories agree across portfolio and admin relationships', () => {
  assert.deepEqual(CLIENTS.map(client => client.name), ['Al Madina Traders', 'Noor Boutique', 'Pak Auto Parts', 'Fresh Basket', 'Urban Chai', 'Prime Property Hub']);
  assert.equal(adminMockData.clients.length, 6);
  assert.equal(CASE_STUDIES_DATA.length, 6);
  for (const client of CLIENTS) {
    assert.equal(adminMockData.clients.find(record => record.id === client.id).title, client.name);
    const project = CASE_STUDIES_DATA.find(project => project.clientId === client.id);
    assert.equal(project.client, client.name);
    assert.equal(project.industry, client.category);
    assert.equal(adminMockData.projects.find(record => record.id === project.id).clientId, client.id);
    assert.ok(adminSections.clients.categories.includes(client.category));
    assert.ok(adminSections.projects.categories.includes(client.category));
  }
  assert.equal(TESTIMONIALS_DATA.length, 0, 'old endorsements are not assigned to new businesses');
});

test('client edits, concurrent writes, and deletions survive reopening the persistent store', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-clients-'));
  const file = path.join(directory, 'clients.json');
  try {
    const store = createClientStore(file, adminMockData.clients);
    await store.update(items => upsertClient(items, { ...items[0], title: 'Al Madina Traders Updated' }));
    await Promise.all(['c2', 'c3'].map(id => store.update(items => upsertClient(items, { ...items.find(item => item.id === id), status: 'Inactive' }))));
    await store.update(items => items.filter(item => item.id !== 'c6'));
    const reopened = await createClientStore(file, adminMockData.clients).read();
    assert.equal(reopened[0].title, 'Al Madina Traders Updated');
    assert.equal(reopened.find(item => item.id === 'c2').status, 'Inactive');
    assert.equal(reopened.find(item => item.id === 'c3').status, 'Inactive');
    assert.equal(reopened.some(item => item.id === 'c6'), false);
    await store.update(() => []);
    assert.deepEqual(await createClientStore(file, adminMockData.clients).read(), []);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('invalid client mutations leave saved client data intact', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-clients-validation-'));
  const file = path.join(directory, 'clients.json');
  try {
    const store = createClientStore(file, adminMockData.clients);
    for (const change of [{ title: '' }, { status: 'Published' }, { title: 'x'.repeat(181) }, { title: CLIENTS[1].name }]) {
      await assert.rejects(store.update(items => upsertClient(items, { ...items[0], ...change })));
    }
    assert.equal((await store.read())[0].title, CLIENTS[0].name);
    await store.update(items => upsertClient(items, { ...items[0], description: 'A valid update.' }));
    assert.equal((await store.read())[0].description, 'A valid update.');
  } finally { await rm(directory, { recursive: true, force: true }); }
});
