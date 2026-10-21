import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import ts from 'typescript';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
function load(file, overrides = {}) {
  const compiled = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL(`../${file}.ts`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  new Function('require', 'module', 'exports', code)(name => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name === 'server-only') return {};
    if (name.startsWith('./')) return load(path.posix.join(path.posix.dirname(file), name), overrides);
    return require(name);
  }, compiled, compiled.exports);
  return compiled.exports;
}
const { processAdminPhoto } = load('lib/admin/profile/image');
const { createAdminPhotoStore } = load('lib/admin/profile/storage');
const sourceImage = () => sharp({ create: { width: 600, height: 300, channels: 3, background: '#94365e' } }).png().toBuffer();

test('admin photo uploads are decoded, cropped, and re-encoded to a compact square image', async () => {
  const result = await processAdminPhoto(new File([await sourceImage()], 'photo.png', { type: 'image/png' }));
  assert.ok(result.startsWith('data:image/webp;base64,'));
  const metadata = await sharp(Buffer.from(result.split(',')[1], 'base64')).metadata();
  assert.equal(metadata.width, 384);
  assert.equal(metadata.height, 384);
  assert.equal(metadata.format, 'webp');
  assert.equal(metadata.exif, undefined);
});

test('invalid, disguised, empty, and oversized uploads are rejected', async () => {
  for (const file of [
    new File(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], 'fake.png', { type: 'image/png' }),
    new File(['not an image'], 'fake.jpg', { type: 'image/jpeg' }),
    new File([], 'empty.png', { type: 'image/png' }),
    new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' }),
    new File([await sourceImage()], 'photo.gif', { type: 'image/gif' }),
  ]) await assert.rejects(processAdminPhoto(file));
});

test('admin photo replacement and removal persist without crossing account boundaries', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-admin-photo-'));
  try {
    const store = createAdminPhotoStore(directory);
    assert.equal((await store.read('admin-one')).image, null);
    const first = await processAdminPhoto(new File([await sourceImage()], 'photo.png', { type: 'image/png' }));
    await store.save('admin-one', first);
    assert.equal((await createAdminPhotoStore(directory).read('admin-one')).image, first);
    assert.equal((await store.read('admin-two')).image, null);
    await assert.rejects(store.save('../another-account', first));
    await assert.rejects(store.save('admin-one', 'data:image/svg+xml;base64,bad'));
    assert.equal((await store.read('admin-one')).image, first);
    await store.save('admin-one', null);
    assert.equal((await createAdminPhotoStore(directory).read('admin-one')).image, null);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('photo actions require authentication and always save against the signed-in account', async () => {
  let allowed = false;
  const writes = [];
  const invalidated = [];
  const actions = load('lib/admin/profile/actions', {
    '../auth/dal': { requireAdmin: async () => { if (!allowed) throw new Error('Unauthorized'); return { user: { id: 'signed-in-admin' } }; } },
    './repository': { adminPhotoStore: { save: async (id, image) => { writes.push({ id, image }); return { image, updatedAt: new Date().toISOString() }; } } },
    'next/cache': { revalidatePath: (...args) => invalidated.push(args) },
  });
  const data = new FormData();
  data.set('photo', new File([await sourceImage()], 'photo.png', { type: 'image/png' }));
  data.set('userId', 'someone-else');
  await assert.rejects(actions.uploadAdminPhoto(data), /Unauthorized/);
  await assert.rejects(actions.removeAdminPhoto(), /Unauthorized/);
  assert.equal(writes.length, 0);
  allowed = true;
  assert.ok((await actions.uploadAdminPhoto(data)).photo.image);
  assert.equal(writes[0].id, 'signed-in-admin');
  assert.equal((await actions.removeAdminPhoto()).photo.image, null);
  assert.equal(writes[1].id, 'signed-in-admin');
  assert.deepEqual(invalidated, [['/admin', 'layout'], ['/admin', 'layout']]);
});
