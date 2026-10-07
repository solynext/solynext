import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const requireModule = createRequire(import.meta.url);

// Exercise the server-only codec without a running Next.js request context.
function loadSession(env = { NODE_ENV: 'development' }) {
  const source = fs.readFileSync(new URL('../lib/admin/auth/session.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiledModule = { exports: {} };
  vm.runInNewContext(code, { module: compiledModule, exports: compiledModule.exports, require: name => name === 'server-only' ? {} : requireModule(name), process: { env }, Buffer, URL, Date });
  return compiledModule.exports;
}

const now = () => Math.floor(Date.now() / 1000);
const user = { id: 'development-admin', name: 'SolyNext Admin', email: 'admin@example.test', role: 'admin' };

test('signed admin session survives verification and excludes passwords', () => {
  const codec = loadSession();
  const session = { user, issuedAt: now(), expiresAt: now() + codec.SESSION_TTL };
  const token = codec.signSession(session);
  assert.equal(JSON.stringify(codec.verifySession(token)), JSON.stringify(session));
  assert.equal('password' in codec.verifySession(token).user, false);
});

test('missing, malformed and tampered sessions are rejected', () => {
  const codec = loadSession();
  for (const value of [undefined, '', 'invalid', 'a.b.c', '.invalid', 'a'.repeat(5000)]) assert.equal(codec.verifySession(value), null);
  const token = codec.signSession({ user, issuedAt: now(), expiresAt: now() + 300 });
  const [body, signature] = token.split('.');
  const changed = Buffer.from(JSON.stringify({ user: { ...user, role: 'owner' }, issuedAt: now(), expiresAt: now() + 300 })).toString('base64url');
  assert.equal(codec.verifySession(`${changed}.${signature}`), null);
  assert.equal(codec.verifySession(`${body}.${signature.slice(0, -4)}AAAA`), null);
});

test('expired, future-issued, oversized-duration and non-admin sessions are rejected', () => {
  const codec = loadSession();
  const invalid = [
    { user, issuedAt: now() - 600, expiresAt: now() - 1 },
    { user, issuedAt: now() + 100, expiresAt: now() + 600 },
    { user, issuedAt: now(), expiresAt: now() + codec.SESSION_TTL + 100 },
    { user: { ...user, role: 'viewer' }, issuedAt: now(), expiresAt: now() + 600 },
  ];
  for (const session of invalid) assert.equal(codec.verifySession(codec.signSession(session)), null);
});

test('development authentication fails closed in production unless explicitly configured', () => {
  for (const env of [
    { NODE_ENV: 'production' },
    { NODE_ENV: 'production', ADMIN_ENABLE_DEV_AUTH: 'true', ADMIN_SESSION_SECRET: 'weak' },
    { NODE_ENV: 'production', ADMIN_SESSION_SECRET: 'x'.repeat(32) },
  ]) {
    const codec = loadSession(env);
    assert.equal(codec.authConfigured(), false);
    assert.equal(codec.verifySession('arbitrary.cookie'), null);
    assert.throws(() => codec.signSession({ user, issuedAt: now(), expiresAt: now() + 600 }));
  }
  assert.equal(loadSession({ NODE_ENV: 'production', ADMIN_ENABLE_DEV_AUTH: 'true', ADMIN_SESSION_SECRET: 'x'.repeat(32) }).authConfigured(), true);
});

test('return destinations stay inside admin and reject open redirects and traversal', () => {
  const codec = loadSession();
  assert.equal(codec.safeAdminReturn('/admin/projects?new=1'), '/admin/projects?new=1');
  for (const value of [null, 'https://evil.example', '//evil.example', '/administrator', '/admin/login', '/admin/../../contact', '/admin/%2e%2e/contact', '/admin/\\evil.example', '/admin/%2f%2fevil.example', '/admin/\r\nLocation:evil']) assert.equal(codec.safeAdminReturn(value), '/admin');
});
