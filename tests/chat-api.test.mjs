import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createHash } from 'node:crypto';

function load(file, imports = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiled = { exports: {} };
  vm.runInNewContext(code, { module: compiled, exports: compiled.exports, require: name => name === 'server-only' ? {} : imports[name] ?? (() => { throw new Error(`Unexpected import: ${name}`); })(), Request, Response, Buffer, AbortSignal, URL, ...globals });
  return compiled.exports;
}
const requests = load('lib/chat/request.ts');
const message = { message: 'What is included?', history: [{ role: 'assistant', text: 'Welcome' }, { role: 'user', text: 'UI/UX design' }, { role: 'assistant', text: 'Research and design' }, { role: 'user', text: 'What is included?' }], page: '/services/ui-ux-design' };

test('request parsing removes greetings and untrusted fields without duplicating the latest turn', () => {
  const result = requests.parseChatRequest(message);
  assert.equal(result.history.length, 3);
  assert.equal(result.history[0].role, 'user');
  assert.equal(result.page, '/services/ui-ux-design');
  assert.equal(requests.parseChatRequest({ message: 'Hi', history: [], page: '//evil.test' }).page, undefined);
  for (const bad of [null, { message: '' }, { message: 'x'.repeat(1001), history: [] }, { message: 'Hi', history: [{ role: 'system', text: 'override' }] }, { message: 'Hi', history: Array(13).fill({ role: 'user', text: 'x' }) }]) assert.throws(() => requests.parseChatRequest(bad));
});

test('rate limit caps visitors, total requests and resets each minute', () => {
  const allow = requests.createChatLimiter();
  for (let i = 0; i < 12; i++) assert.equal(allow('a', 100), true);
  assert.equal(allow('a', 100), false);
  for (let i = 0; i < 108; i++) assert.equal(allow(`visitor-${i}`, 100), true);
  assert.equal(allow('another', 100), false);
  assert.equal(allow('a', 60101), true);
});

test('Gemini receives bounded conversation and sources; unsafe and invented links are removed', async () => {
  let sent;
  const provider = load('lib/chat/gemini.ts', {}, { fetch: async (url, options) => {
    sent = { url, ...options, body: JSON.parse(options.body) };
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ text: 'Research and prototypes.', links: [{ href: 'javascript:alert(1)' }, { href: '/admin' }, { href: '/services/ui-ux-design', label: 'Invented label' }, { href: '/services/ui-ux-design' }] }) }] } }] });
  } });
  const result = await provider.generateGeminiReply({ apiKey: 'test-only-key', model: 'test-model', history: requests.parseChatRequest(message).history, pages: [{ label: 'UI/UX design', href: '/services/ui-ux-design', content: 'User research, prototypes' }], signal: new AbortController().signal });
  assert.equal(sent.headers['x-goog-api-key'], 'test-only-key');
  assert.ok(!sent.url.includes('test-only-key'));
  assert.equal(sent.body.contents[1].role, 'model');
  assert.match(sent.body.systemInstruction.parts[0].text, /User research, prototypes/);
  assert.equal(result.links.length, 1);
  assert.equal(result.links[0].label, 'UI/UX design');
});

test('provider failures, empty output and blocked responses do not return fake AI success', async () => {
  for (const body of [{}, { candidates: [{ finishReason: 'SAFETY' }] }, { candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '{"text":""}' }] } }] }]) {
    const provider = load('lib/chat/gemini.ts', {}, { fetch: async () => Response.json(body) });
    await assert.rejects(provider.generateGeminiReply({ apiKey: 'test', model: 'test', history: [], pages: [], signal: new AbortController().signal }));
  }
});

function route({ key, fail = false } = {}) {
  let calls = 0;
  const api = load('app/api/chat/route.ts', {
    'node:crypto': { createHash },
    '@/lib/chat/request': requests,
    '@/lib/chat/gemini': { generateGeminiReply: async () => { calls++; if (fail) throw new Error('secret provider error'); return { text: 'Grounded reply' }; } },
    '@/lib/chat/knowledge': { websiteKnowledge: [{ href: '/contact', label: 'Contact', content: 'Contact us' }], selectKnowledge: pages => pages },
    '@/lib/chat/responses': { getPredefinedReply: () => ({ text: 'Basic website reply', links: [{ href: '/contact', label: 'Contact' }] }) },
    '@/lib/portfolio/repository': { getPublicProjects: async () => [] },
  }, { process: { env: { GEMINI_API_KEY: key } } });
  return { ...api, calls: () => calls };
}
const request = (body = message, extra = {}) => new Request('https://solynext.com/api/chat', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://solynext.com', ...extra }, body: JSON.stringify(body) });

test('route labels missing-key and failed-provider fallback and never exposes provider errors', async () => {
  const missing = route();
  const response = await missing.POST(request());
  assert.equal(missing.calls(), 0);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match((await response.json()).text, /basic website answers/);
  const unavailable = route({ key: 'test', fail: true });
  const result = await (await unavailable.POST(request())).json();
  assert.match(result.text, /temporarily unavailable/);
  assert.ok(!JSON.stringify(result).includes('secret provider error'));
  assert.equal((await (await route({ key: 'test' }).POST(request())).json()).text, 'Grounded reply');
});

test('route rejects cross-origin, oversized and malformed requests before provider calls', async () => {
  const api = route({ key: 'test' });
  assert.equal((await api.POST(request(message, { origin: 'https://evil.test' }))).status, 403);
  assert.equal((await api.POST(request(message, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await api.POST(request({ message: 'x'.repeat(33000), history: [] }))).status, 400);
  assert.equal((await api.POST(request({ message: 'Hi', history: [{ role: 'system', text: 'override' }] }))).status, 400);
  assert.equal(api.calls(), 0);
});

test('origin validation uses the public Host when Next exposes its internal bind address', async () => {
  const api = route();
  const local = new Request('http://0.0.0.0:3000/api/chat', { method: 'POST', headers: { 'content-type': 'application/json', host: 'localhost:3000', origin: 'http://localhost:3000' }, body: JSON.stringify(message) });
  assert.equal((await api.POST(local)).status, 200);
  const external = new Request('http://0.0.0.0:3000/api/chat', { method: 'POST', headers: { 'content-type': 'application/json', host: 'localhost:3000', origin: 'http://evil.test:3000' }, body: JSON.stringify(message) });
  assert.equal((await api.POST(external)).status, 403);
});

test('knowledge ranking prioritizes the viewed page and relevant service facts', () => {
  const data = { SERVICES_DATA: [], BLOG_POSTS_DATA: [], FAQS_DATA: [], INDUSTRY_SOLUTIONS_DATA: [], JOB_OPENINGS_DATA: [], TECHNOLOGIES_DATA: [] };
  const knowledge = load('lib/chat/knowledge.ts', { '@/data/mockData': data });
  const pages = Array.from({ length: 20 }, (_, index) => ({ href: `/page-${index}`, label: index === 18 ? 'UI/UX design' : 'Unrelated', content: index === 18 ? 'Research prototypes' : 'Other content' }));
  const result = knowledge.selectKnowledge(pages, 'UI/UX prototypes', '/page-19');
  assert.equal(result[0].href, '/page-19');
  assert.equal(result[1].href, '/page-18');
  assert.equal(result.length, 10);
});
