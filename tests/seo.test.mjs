import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function load(file, overrides = {}) {
  const compiled = { exports: {} };
  const source = fs.readFileSync(new URL(`../${file}.ts`, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'module', 'exports', code)(name => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name === 'server-only') return {};
    if (name.startsWith('./')) return load(path.posix.join(path.posix.dirname(file), name), overrides);
    if (name.startsWith('@/')) return load(name.slice(2), overrides);
    return require(name);
  }, compiled, compiled.exports);
  return compiled.exports;
}
const { defaultSeo, validateSeo, resolvePageSeo } = load('lib/seo/model');
const { createSeoStore } = load('lib/seo/storage');
const draft = extra => ({ ...structuredClone(defaultSeo), siteUrl: 'https://solynext.com', ...extra });

test('SEO validation rejects unsafe domains, image paths, verification tags, and private page overrides', () => {
  for (const siteUrl of ['javascript:alert(1)', 'http://solynext.com', 'https://user:pass@solynext.com', 'https://solynext.com/path', 'https://solynext.com?q=1']) assert.throws(() => validateSeo(draft({ siteUrl })));
  for (const socialImage of ['javascript:alert(1)', '/admin/profile', '/images/../secret.png', '//evil.test/a.jpg']) assert.throws(() => validateSeo(draft({ socialImage })));
  for (const route of ['/admin', '/admin/settings', '/api/notifications', '//other.test', '/services/../admin']) assert.throws(() => validateSeo(draft({ pages: { [route]: { title: '', description: '', index: false } } })));
  assert.throws(() => validateSeo(draft({ googleVerification: '<meta name="google-site-verification">' })));
  assert.throws(() => validateSeo(draft({ updatedAt: 'invalid' })));
  assert.equal(validateSeo(draft({ siteUrl: 'https://solynext.com/' })).siteUrl, 'https://solynext.com');
});

test('live previews support incomplete domains and independent page overrides', () => {
  const settings = draft({ siteUrl: 'https://', pages: { '/about': { title: 'Our team', description: 'Meet our team.', index: false } } });
  assert.equal(resolvePageSeo(settings, '/about').canonical, undefined);
  assert.equal(resolvePageSeo(settings, '/about').title, 'Our team');
  assert.equal(resolvePageSeo(settings, '/about').index, false);
  assert.equal(resolvePageSeo(settings, '/contact', { title: 'Contact us' }).title, 'Contact us');
});

test('published SEO settings survive restart and stale saves cannot overwrite a newer revision', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'solynext-seo-'));
  const file = path.join(directory, 'settings.json');
  try {
    const store = createSeoStore(file);
    assert.deepEqual(await store.read(), defaultSeo);
    const first = await store.save(draft(), '');
    assert.equal((await createSeoStore(file).read()).siteUrl, 'https://solynext.com');
    const attempts = await Promise.allSettled([
      store.save({ ...first, title: 'Published title' }, first.updatedAt),
      store.save({ ...first, title: 'Stale title' }, first.updatedAt),
    ]);
    assert.equal(attempts[0].status, 'fulfilled');
    assert.equal(attempts[1].status, 'rejected');
    const saved = await store.read();
    assert.equal(saved.title, 'Published title');
    await assert.rejects(store.save({ ...saved, siteUrl: 'javascript:alert(1)' }, saved.updatedAt));
    assert.equal((await store.read()).title, 'Published title');
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('real page metadata uses canonical URLs, page overrides, verification, and separate social defaults', async () => {
  const settings = draft({
    googleVerification: 'google-token', bingVerification: 'bing-token', socialTitle: 'Homepage social title',
    pages: { '/about': { title: 'About our team', description: 'People and engineering.', index: false } },
  });
  const { getSiteMetadata, getPageMetadata } = load('lib/seo/metadata', { './repository': { getSeoSettings: async () => settings } });
  const root = await getSiteMetadata();
  assert.equal(root.verification.google, 'google-token');
  assert.equal(root.verification.other['msvalidate.01'], 'bing-token');
  assert.equal(root.alternates, undefined, 'root layout must not assign the homepage canonical to every page');
  const about = await getPageMetadata('/about');
  assert.equal(about.title, 'About our team');
  assert.equal(about.openGraph.title, 'About our team');
  assert.equal(about.alternates.canonical, 'https://solynext.com/about');
  assert.equal(about.robots.index, false);
  assert.equal(about.openGraph.images[0].url, 'https://solynext.com/images/hero-tech.jpg');
  assert.equal((await getPageMetadata('/')).openGraph.title, 'Homepage social title');
  assert.equal((await getPageMetadata('/services/custom', { title: 'Custom service' })).twitter.title, 'Custom service');
});

test('sitemap includes only public indexable pages and published projects; robots does not block noindex crawling', async () => {
  let settings = draft({ pages: { '/about': { title: '', description: '', index: false } } });
  const overrides = {
    '@/lib/seo/repository': { getSeoSettings: async () => settings },
    '@/lib/portfolio/repository': { portfolioStore: { read: async () => [
      { slug: 'published', status: 'Published', updatedAt: '2026-10-18T00:00:00Z' },
      { slug: 'draft', status: 'Draft' },
    ] } },
  };
  const sitemap = load('app/sitemap', overrides).default;
  const robots = load('app/robots', overrides).default;
  const urls = (await sitemap()).map(item => item.url);
  assert.ok(urls.includes('https://solynext.com/portfolio/published'));
  assert.equal(urls.some(url => url.endsWith('/about') || url.endsWith('/draft') || url.includes('/admin')), false);
  assert.equal((await robots()).sitemap, 'https://solynext.com/sitemap.xml');
  settings = { ...settings, allowIndexing: false };
  assert.deepEqual(await sitemap(), []);
  assert.equal((await robots()).rules.allow, '/');
  assert.ok((await robots()).rules.disallow.includes('/admin'));
  settings = { ...settings, allowIndexing: true, siteUrl: '' };
  assert.deepEqual(await sitemap(), []);
});
