import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(name, browser = {}) {
  const source = fs.readFileSync(new URL(`../lib/profile/${name}.ts`, import.meta.url), 'utf8');
  const module = { exports: {} };
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, window: browser, require: path => load(path.replace('./', ''), browser) });
  return module.exports;
}
const { createProfileService, validateProfile } = load('service');
const details = { name: '  Ayesha Khan  ', email: ' ayesha@example.com ', profileImage: null };

test('profile saves normalized details and persists through a new service instance', async () => {
  let stored = null;
  const adapter = { async read() { return stored; }, async write(value) { stored = JSON.parse(JSON.stringify(value)); } };
  const service = createProfileService(adapter);
  assert.equal((await service.getUserProfile()).id, 'local-user');
  const saved = await service.updateUserProfile(details);
  assert.equal(saved.name, 'Ayesha Khan');
  assert.equal(saved.email, 'ayesha@example.com');
  assert.ok(Number.isFinite(Date.parse(saved.updatedAt)));
  assert.equal((await createProfileService(adapter).getUserProfile()).name, saved.name);
});

test('image replacement and removal preserve profile details', async () => {
  let stored = null;
  const service = createProfileService({ async read() { return stored; }, async write(value) { stored = value; } });
  await service.updateUserProfile(details);
  const first = await service.updateProfileImage('data:image/png;base64,aGVsbG8=');
  assert.equal(first.profileImage, 'data:image/png;base64,aGVsbG8=');
  const second = await service.updateProfileImage('data:image/webp;base64,dGVzdA==');
  assert.equal(second.profileImage, 'data:image/webp;base64,dGVzdA==');
  const removed = await service.removeProfileImage();
  assert.equal(removed.profileImage, null);
  assert.equal(removed.email, 'ayesha@example.com');
});

test('invalid drafts never write and corrupt saved records restore the default', async () => {
  let writes = 0;
  const service = createProfileService({ async read() { return { name: 'broken' }; }, async write() { writes++; } });
  assert.equal((await service.getUserProfile()).name, 'Your name');
  assert.ok(validateProfile({ ...details, name: '' }).name);
  assert.ok(validateProfile({ ...details, email: 'invalid' }).email);
  assert.ok(validateProfile({ ...details, profileImage: 'https://example.com/photo.png' }).profileImage);
  assert.ok(validateProfile({ ...details, profileImage: 'data:image/svg+xml;base64,aGVsbG8=' }).profileImage);
  await assert.rejects(service.updateUserProfile({ ...details, email: 'invalid' }));
  assert.equal(writes, 0);
});

test('storage failures reject a save without replacing existing data', async () => {
  const previous = { id: 'local-user', ...details, name: 'Ayesha', email: 'ayesha@example.com', updatedAt: null };
  const service = createProfileService({ async read() { return previous; }, async write() { throw new Error('Storage unavailable'); } });
  await assert.rejects(service.updateUserProfile({ ...details, name: 'Changed' }), /Storage unavailable/);
  assert.equal((await service.getUserProfile()).name, 'Ayesha');
});

test('local adapter handles broken JSON, blocked reads, and quota failures', async () => {
  const corrupt = load('local-storage', { localStorage: { getItem() { return '{bad'; } } });
  assert.equal(await corrupt.localProfileAdapter.read(), null);
  const blocked = load('local-storage', { localStorage: { getItem() { throw new Error('Blocked'); }, setItem() { throw new Error('Quota'); } } });
  assert.equal(await blocked.localProfileAdapter.read(), null);
  await assert.rejects(blocked.localProfileAdapter.write(details), /could not save/);
});

test('image validation rejects unsupported formats and oversized files before decoding', async () => {
  const { prepareProfileImage } = load('image');
  await assert.rejects(prepareProfileImage({ type: 'image/svg+xml', size: 20 }), /JPG, PNG, or WebP/);
  await assert.rejects(prepareProfileImage({ type: 'image/png', size: 6 * 1024 * 1024 }), /smaller than 5 MB/);
});
