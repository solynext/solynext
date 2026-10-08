import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtemp, readFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file) {
  const compiled = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL(`../${file}.ts`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'module', 'exports', code)(name => name === './model' ? load('lib/portfolio/model') : require(name), compiled, compiled.exports);
  return compiled.exports;
}
const { validateProject, publicProjects, upsertProject } = load('lib/portfolio/model');
const { createPortfolioStore } = load('lib/portfolio/storage');
const { CASE_STUDIES_DATA } = load('data/mockData');
const input = { title: 'Public project', slug: 'public-project', client: 'Acme', clientLocation: 'Pakistan', industry: 'SaaS', summary: 'A useful public platform.', challenge: '', solution: '', featuredImage: '/images/engineering-dev.jpg', imageAlt: 'Platform dashboard', projectUrl: 'https://example.com', technologies: ['React'], architectureDetails: [], keyResults: [], gallery: [], completionDate: '', projectId: 'internal-delivery-id', status: 'Draft', featured: false, displayOrder: 0 };
const row = (id, extra = {}) => ({ ...input, id, updatedAt: '2026-10-08T01:00:00Z', ...extra });
test('existing case studies migrate without losing their public content', () => {
  for (const project of CASE_STUDIES_DATA) {
    const migrated = validateProject({ ...input, ...project, imageAlt: project.title });
    assert.equal(migrated.title, project.title);
    assert.deepEqual(migrated.keyResults, project.keyResults);
    assert.deepEqual(migrated.testimonial, project.testimonial);
  }
});
test('public projects exclude drafts, archives and internal delivery references', () => {
  const publicItems = publicProjects([row('draft'), row('archived', { status: 'Archived', slug: 'archived' }), row('second', { status: 'Published', slug: 'second', displayOrder: 2 }), row('first', { status: 'Published', slug: 'first', displayOrder: 1, featured: true })]);
  assert.deepEqual(publicItems.map(item => item.id), ['first', 'second']);
  assert.equal(publicItems.some(item => 'projectId' in item || 'status' in item || 'updatedAt' in item), false);
});
test('invalid links, images, dates and slugs cannot be published', () => {
  for (const projectUrl of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com']) assert.throws(() => validateProject({ ...input, projectUrl }));
  for (const featuredImage of ['/admin/profile', '/images/../secret.jpg', 'data:image/svg+xml,test', '//evil.test/image.jpg']) assert.throws(() => validateProject({ ...input, featuredImage }));
  for (const slug of ['../admin', 'UPPER CASE', 'duplicate--slug']) assert.throws(() => validateProject({ ...input, slug }));
  assert.throws(() => validateProject({ ...input, completionDate: '2026-02-31' }));
  assert.throws(() => validateProject({ ...input, gallery: [{ src: input.featuredImage, alt: '' }] }));
});
test('editing preserves project identity and slug collisions leave the other project intact', () => {
  const initial = [row('one'), row('two', { slug: 'other-project' })];
  const next = upsertProject(initial, 'one', { ...input, title: 'Updated', status: 'Published', gallery: [{ src: input.featuredImage, alt: 'Screenshot' }], featured: true });
  assert.equal(next[0].id, 'one'); assert.equal(next[0].status, 'Published'); assert.equal(next[0].gallery.length, 1);
  assert.throws(() => upsertProject(initial, 'one', { ...input, slug: 'other-project' }));
  assert.throws(() => upsertProject(initial, 'missing', input));
  assert.equal(initial[0].title, 'Public project');
});
test('concurrent portfolio writes persist and deleted projects do not reappear after restart', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-portfolio-'));
  const file = path.join(directory, 'projects.json');
  try {
    const seed = [row('initial')];
    const store = createPortfolioStore(file, seed);
    assert.equal((await store.read()).length, 1);
    await Promise.all(Array.from({ length: 8 }, (_, i) => store.update(items => upsertProject(items, null, { ...input, slug: `project-${i}`, status: 'Published' }))));
    const restarted = createPortfolioStore(file, seed);
    assert.equal((await restarted.read()).length, 9);
    await store.update(items => items.filter(item => item.id !== 'initial'));
    assert.equal((await restarted.read()).some(item => item.id === 'initial'), false);
    await store.update(() => []);
    assert.deepEqual(await restarted.read(), []);
    assert.equal(await readFile(file, 'utf8'), '[]');
  } finally { await unlink(file).catch(() => {}); await rmdir(directory); }
});
