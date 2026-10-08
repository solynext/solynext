import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

function setup() {
  class Input { constructor(value, type = 'text') { this.value = value; this.type = type; this.checked = false; this.files = []; } }
  class Select { constructor() { this.multiple = true; this.selectedOptions = [{ value: 'a' }]; } }
  const field = new Input('Original');
  const checkbox = new Input('', 'checkbox');
  const file = new Input('', 'file');
  const select = new Select();
  const form = { querySelectorAll: () => [field, checkbox, file, select] };
  const scope = { querySelectorAll: () => [form] };
  let answer = false, prompts = 0;
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(new URL('../components/admin/AdminUnsavedChanges.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  new Function('exports', 'require', 'HTMLInputElement', 'HTMLSelectElement', 'window', 'CustomEvent', code)(exports, () => ({}), Input, Select, { dispatchEvent: event => { prompts++; event.detail.resolve(answer); } }, class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } });
  exports.markAdminFormSaved(form);
  return { ...exports, form, scope, field, checkbox, file, select, accept: async () => { answer = true; }, prompts: () => prompts };
}

test('unchanged and reverted edits do not show a discard prompt', async () => {
  const s = setup();
  assert.equal(await s.confirmAdminDiscard(s.scope), true);
  s.field.value = 'Edited'; s.field.value = 'Original';
  assert.equal(await s.confirmAdminDiscard(s.scope), true);
  assert.equal(s.prompts(), 0);
});

test('cancelling protects edits and continues protecting them on another attempt', async () => {
  const s = setup(); s.field.value = 'Edited';
  assert.equal(await s.confirmAdminDiscard(s.scope), false);
  assert.equal(s.field.value, 'Edited');
  assert.equal(await s.confirmAdminDiscard(s.scope), false);
  assert.equal(s.prompts(), 2);
});

test('confirmed discard and successful save clear the warning', async () => {
  const s = setup(); s.field.value = 'Edited'; s.accept();
  assert.equal(await s.confirmAdminDiscard(s.scope), true);
  assert.equal(await s.confirmAdminDiscard(s.scope), true);
  assert.equal(s.prompts(), 1);
  s.field.value = 'Saved'; s.markAdminFormSaved(s.form);
  assert.equal(await s.confirmAdminDiscard(s.scope), true);
  assert.equal(s.prompts(), 1);
});

test('checkboxes, uploaded files, and multi-select changes are protected', async () => {
  for (const edit of [s => { s.checkbox.checked = true; }, s => { s.file.files = [{ name: 'image.png', size: 20, lastModified: 1 }]; }, s => { s.select.selectedOptions = [{ value: 'b' }]; }]) {
    const s = setup(); edit(s);
    assert.equal(await s.confirmAdminDiscard(s.scope), false);
  }
});
