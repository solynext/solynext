import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../lib/admin/selectors.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const compiled = { exports: {} };
vm.runInNewContext(code, { module: compiled, exports: compiled.exports });
const { deliveryMetrics, removeRecords, projectTasks, clientProjects } = compiled.exports;
const sample = () => ({ clients: [{id:'c1',status:'Active'}], projects: [{id:'p1',status:'In Progress',progress:60,clientId:'c1',assignedTeam:['t1','t2']},{id:'p2',status:'Completed',progress:100},{id:'p3',status:'Pending',progress:0}], tasks:[{id:'task1',projectId:'p1',assignedTo:'t1',status:'Completed'},{id:'task2',projectId:'p1',status:'Blocked'}], portfolio:[{id:'pf1',projectId:'p1',clientId:'c1'}], reviews:[{id:'r1',clientId:'c1'}], team:[{id:'t1'},{id:'t2'}], inquiries:[{id:'iq1',assignedTo:'t1'}], services:[],technologies:[],media:[],content:[],partners:[],roles:[] });
test('delivery metrics reflect workflow stages and exclude completed work from active progress', () => {
  const result=deliveryMetrics(sample());
  assert.equal(result.overallProgress,60);assert.equal(result.activeProjects,1);assert.equal(result.completedProjects,1);assert.equal(result.pendingProjects,1);assert.equal(result.pendingTasks,1);assert.equal(result.completedTasks,1);
  assert.equal(projectTasks(sample(),'p1').length,2);assert.equal(clientProjects(sample(),'c1').length,1);
  assert.equal(deliveryMetrics({...sample(),projects:[]}).overallProgress,0);
});
test('deleting clients clears references without deleting their work or reviews', () => {
  const data=sample();const next=removeRecords(data,'clients',['c1']);
  for(const section of ['projects','portfolio','reviews']){assert.equal(next[section][0].clientId,undefined);assert.equal(next[section].length,data[section].length);}
  assert.equal(data.projects[0].clientId,'c1');assert.equal(next.clients.length,0);
});
test('deleting projects preserves tasks and portfolio while clearing project links', () => {
  const next=removeRecords(sample(),'projects',['p1']);assert.equal(next.tasks.length,2);assert.equal(next.tasks[0].projectId,undefined);assert.equal(next.portfolio[0].projectId,undefined);assert.equal(next.projects.length,2);
});
test('deleting team members clears assignments without affecting other members', () => {
  const next=removeRecords(sample(),'team',['t1']);assert.equal(next.projects[0].assignedTeam.join(','),'t2');assert.equal(next.tasks[0].assignedTo,undefined);assert.equal(next.inquiries[0].assignedTo,undefined);assert.equal(next.team[0].id,'t2');
});
