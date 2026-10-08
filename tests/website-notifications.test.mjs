import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtemp, readFile, writeFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file) {
  const code = ts.transpileModule(fs.readFileSync(new URL(`../lib/notifications/${file}.ts`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', code)(name => name === './types' ? load('types') : require(name), compiled, compiled.exports);
  return compiled.exports;
}
const { validateNotification, publishedNotifications } = load('types');
const { createNotificationStore } = load('storage');
const input = { title: 'Release news', message: 'Our new service is available.', href: '/services', status: 'published' };
const row = (id, status = 'published') => ({ ...input, id, status, createdAt: '2026-10-08T01:00:00Z', updatedAt: '2026-10-08T01:00:00Z', publishedAt: status === 'published' ? '2026-10-08T01:00:00Z' : null });

test('notification validation rejects unsafe links, private routes and oversized content', () => {
  for (const href of ['javascript:alert(1)', '//evil.test', '/\\evil.test', '/admin/settings', '/api/notifications', '/%2e%2e/admin', 'https://user:pass@example.com', 'http://example.com']) assert.throws(() => validateNotification({ ...input, href }), href);
  assert.throws(() => validateNotification({ ...input, title: ' ' }));
  assert.throws(() => validateNotification({ ...input, message: 'x'.repeat(2001) }));
  assert.throws(() => validateNotification({ ...input, status: 'unknown' }));
  assert.equal(validateNotification({ ...input, href: 'https://example.com/news' }).href, 'https://example.com/news');
});
test('the public feed excludes drafts and internal fields and orders newest releases first', () => {
  const newest = { ...row('new'), publishedAt: '2026-10-09T01:00:00Z' };
  const publicItems = publishedNotifications([row('old'), row('private', 'draft'), newest]);
  assert.deepEqual(publicItems.map(item => item.id), ['new', 'old']);
  assert.equal(publicItems.some(item => 'status' in item || 'createdAt' in item), false);
});
test('concurrent saves persist without lost updates and survive a new store instance', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-notifications-'));
  const file = path.join(directory, 'notifications.json');
  try {
    const store = createNotificationStore(file);
    assert.deepEqual(await store.read(), []);
    await Promise.all(Array.from({ length: 12 }, (_, i) => store.update(items => [...items, row(String(i))])));
    const restored = await createNotificationStore(file).read();
    assert.equal(restored.length, 12);
    assert.equal(new Set(restored.map(item => item.id)).size, 12);
    assert.equal(JSON.parse(await readFile(file, 'utf8')).length, 12);
    await store.update(items => items.filter(item => item.id !== '3'));
    assert.equal((await store.read()).some(item => item.id === '3'), false);
    await store.update(() => []);
    assert.deepEqual(await createNotificationStore(file).read(), []);
  } finally { await unlink(file).catch(() => {}); await rmdir(directory); }
});
test('failed mutations leave existing notifications intact and do not poison the update queue', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-notifications-'));
  const file = path.join(directory, 'notifications.json');
  try {
    const store = createNotificationStore(file);
    await store.update(() => [row('one')]);
    await assert.rejects(store.update(() => { throw new Error('Validation failed'); }));
    assert.equal((await store.read())[0].id, 'one');
    await store.update(items => [...items, row('two')]);
    assert.equal((await store.read()).length, 2);
    await writeFile(file, '{broken', 'utf8');
    await assert.rejects(store.update(() => []));
    assert.equal(await readFile(file, 'utf8'), '{broken');
  } finally { await unlink(file).catch(() => {}); await rmdir(directory); }
});
