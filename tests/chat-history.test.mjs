import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(name) {
  const source=fs.readFileSync(new URL(`../lib/chat/${name}.ts`,import.meta.url),'utf8');
  const compiled={exports:{}};
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(code,{module:compiled,exports:compiled.exports,require:name=>load(name.replace('./',''))});
  return compiled.exports;
}
const {CHAT_HISTORY_KEY,readChatHistory,saveChatHistory,clearChatHistory}=load('history');
const {getPredefinedReply}=load('responses');
const memory=()=>{const data=new Map();return {getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};};
const thread=[{id:'welcome',role:'assistant',text:'Welcome'},{id:'u1',role:'user',text:'I need a website for my clothing business'},{id:'a1',role:'assistant',text:'What features do you need?',links:[{label:'Contact',href:'/contact'}]}];

test('completed history restores with project context, and clearing removes it',()=>{
  const storage=memory();assert.equal(saveChatHistory(storage,thread),true);const loaded=readChatHistory(storage);assert.equal(loaded.length,3);assert.equal(loaded[2].links[0].href,'/contact');assert.match(getPredefinedReply('What will it cost?',loaded).text,/clothing website/);
  assert.equal(clearChatHistory(storage),true);assert.equal(readChatHistory(storage),null);
});
test('pending requests do not replace the last complete exchange and welcome alone stays unsaved',()=>{
  const storage=memory();saveChatHistory(storage,thread);saveChatHistory(storage,[...thread,{id:'u2',role:'user',text:'Add payments'}]);assert.equal(readChatHistory(storage).length,3);saveChatHistory(storage,[thread[0]]);assert.equal(storage.getItem(CHAT_HISTORY_KEY),null);
});
test('restored links are limited to published service routes and contact',()=>{
  const storage=memory();storage.setItem(CHAT_HISTORY_KEY,JSON.stringify({version:1,messages:[{...thread[2],links:[{label:'Bad',href:'javascript:alert(1)'},{label:'External',href:'https://example.com'},{label:'Admin',href:'/admin'},{label:'Website',href:'/services/web-development'}]}]}));const result=readChatHistory(storage);assert.equal(result[0].links.length,1);assert.equal(result[0].links[0].href,'/services/web-development');
});
test('invalid, oversized, and unavailable storage cannot crash the chat',()=>{
  const storage=memory();for(const raw of ['{broken',JSON.stringify({version:2,messages:thread}),JSON.stringify({version:1,messages:[{...thread[0],role:'system'}]}),JSON.stringify({version:1,messages:[thread[0],thread[0]]}),'x'.repeat(600001)]){storage.setItem(CHAT_HISTORY_KEY,raw);assert.equal(readChatHistory(storage),null);}
  const blocked={getItem(){throw Error('Blocked');},setItem(){throw Error('Quota');},removeItem(){throw Error('Blocked');}};assert.equal(readChatHistory(blocked),null);assert.equal(saveChatHistory(blocked,thread),false);assert.equal(clearChatHistory(blocked),false);
});
test('saved history is bounded to the welcome and the most recent 100 exchanges',()=>{
  const storage=memory();const history=[thread[0],...Array.from({length:220},(_,i)=>({id:'m'+i,role:i%2?'assistant':'user',text:'Message '+i}))];saveChatHistory(storage,history);const restored=readChatHistory(storage);assert.equal(restored.length,201);assert.equal(restored[0].id,'welcome');assert.equal(restored[1].id,'m20');assert.equal(restored.at(-1).id,'m219');
});
