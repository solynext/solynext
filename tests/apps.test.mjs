import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const nativeRequire = createRequire(import.meta.url);
function load(name) {
 const source = fs.readFileSync(new URL(`../lib/apps/${name}.ts`,import.meta.url),'utf8');
 const sandbox = { exports:{} };
 const code = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module:sandbox,exports:sandbox.exports,require:specifier=>specifier.startsWith('./')?load(specifier.slice(2)):nativeRequire(specifier),URL,Date,Promise,Set,JSON,Error});
 return sandbox.exports;
}
const { validateApp, publishedApps } = load('model');
const { createAppStore } = load('storage');
const base = { id:'11111111-1111-4111-8111-111111111111',name:'  Test app  ',description:'Useful app',details:'Instructions',url:'https://example.com/app',image:'/api/app-images/22222222-2222-4222-8222-222222222222.webp',category:'Productivity',developer:'SolyNext',version:'1.0',status:'Published',featured:false,order:1,updatedAt:new Date().toISOString() };
test('validates and normalizes app fields; rejects executable URLs and invalid assets',()=>{
  assert.equal(validateApp(base).name,'Test app');
  for(const url of ['javascript:alert(1)','data:text/html,hi','https://user:password@example.com','not a URL']) assert.throws(()=>validateApp({...base,url}));
  assert.throws(()=>validateApp({...base,image:'/etc/passwd'}));
  assert.throws(()=>validateApp({...base,name:''}));
  assert.throws(()=>validateApp({...base,name:'Four'}));
  assert.throws(()=>validateApp({...base,name:'1234567890123456'}));
  assert.equal(validateApp({...base,name:'12345'}).name,'12345');
  assert.equal(validateApp({...base,name:'123456789012345'}).name,'123456789012345');
  assert.throws(()=>validateApp({...base,status:'Anything'}));
  assert.throws(()=>validateApp({...base,order:-1}));
});
test('hides drafts and sorts featured apps before display order',()=>{
  const featured=validateApp({...base,id:'33333333-3333-4333-8333-333333333333',featured:true,order:99});
  const draft=validateApp({...base,id:'44444444-4444-4444-8444-444444444444',status:'Draft'});
  assert.equal(JSON.stringify(publishedApps([validateApp(base),draft,featured]).map(app=>app.id)),JSON.stringify([featured.id,base.id]));
});
test('serializes concurrent writes and persists edit/delete through a new store',async()=>{
 const directory=await mkdtemp(path.join(tmpdir(),'solynext-apps-'));
 try {
  const file=path.join(directory,'apps.json');const store=createAppStore(file);
  assert.equal((await store.read()).length,0);
  await Promise.all([store.update(items=>[...items,validateApp(base)]),store.update(items=>[...items,validateApp({...base,id:'33333333-3333-4333-8333-333333333333',name:'Second'})])]);
  assert.equal((await createAppStore(file).read()).length,2);
  await store.update(items=>items.map(item=>item.id===base.id?{...item,name:'Edited app'}:item));
  assert.equal((await createAppStore(file).read())[0].name,'Edited app');
  await store.update(items=>items.filter(item=>item.id!==base.id));
  assert.equal((await createAppStore(file).read()).length,1);
  await assert.rejects(store.update(items=>[...items,...items]));
  assert.equal((await store.read()).length,1);
 }finally{await rm(directory,{recursive:true,force:true});}
});