import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { sql } from 'drizzle-orm';
const nativeRequire=createRequire(import.meta.url);
const pg=new PGlite();const db=drizzle(pg);const cache=new Map();
function load(name){if(cache.has(name))return cache.get(name);const sandbox={exports:{}};cache.set(name,sandbox.exports);const source=fs.readFileSync(new URL(`../lib/catalog/${name}.ts`,import.meta.url),'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;vm.runInNewContext(code,{module:sandbox,exports:sandbox.exports,require:specifier=>{if(specifier==='server-only')return{};if(specifier==='./db')return{getCatalogDb:()=>db};if(specifier==='./security')return{previewToken:()=> 'test-token'};if(specifier==='next/cache')return{unstable_cache:fn=>fn,revalidateTag:()=>{},revalidatePath:()=>{}};if(specifier.startsWith('./'))return load(specifier.slice(2));return nativeRequire(specifier);},URL,Date,JSON,Set,Map,crypto:globalThis.crypto});return sandbox.exports;}
const model=load('model'),repo=load('repository');const seeds=JSON.parse(fs.readFileSync(new URL('../db/seeds/services.json',import.meta.url),'utf8'));
let actor;
test.before(async()=>{for(const filename of fs.readdirSync(new URL('../db/migrations/',import.meta.url)).filter(name=>name.endsWith('.sql')).sort())await pg.exec(fs.readFileSync(new URL('../db/migrations/'+filename,import.meta.url),'utf8'));actor=(await db.execute(sql`insert into solynext_catalog.admin_users(email,password_hash,role) values('catalog-test@example.com','test-only','super_admin') returning id,email,role`)).rows[0];});
test.after(async()=>{await pg.close();});
test('all eleven supplied services pass validation with four featured and 33 FAQs',()=>{assert.equal(seeds.length,11);for(const seed of seeds)model.serviceSchema.parse(seed);assert.equal(seeds.filter(item=>item.is_featured).length,4);assert.equal(seeds.reduce((sum,item)=>sum+item.faqs.length,0),33);assert.throws(()=>model.serviceSchema.parse({...seeds[0],card_summary:'x'.repeat(121)}));assert.throws(()=>model.serviceSchema.parse({...seeds[0],slug:'../bad'}));});
test('transactional CRUD, relations, draft isolation, redirects, audit, roles and revision checks',async()=>{
 const initial={...seeds[0],slug:'catalog-test',name:'Catalog test',overview:'<p>Safe <strong>content</strong></p><script>alert(1)</script>',project_ids:[],industry_ids:[]};
 const created=await repo.saveOffering('services',initial,actor);assert.equal(created.status,'published');assert.ok(!created.overview.includes('<script>'));assert.equal((await repo.listOfferings('services',true)).length,1);
 await assert.rejects(repo.saveOffering('services',initial,actor),/slug is already/);
 const sector=await repo.saveOffering('industries',{...model.emptyOffering('industries'),name:'Testing industry',slug:'testing-industry',tagline:'Test sector',card_summary:'Sector summary',overview:'<p>Sector overview</p>',business_segments:[{name:'Test business',solutions:'Booking system'}],status:'published'},actor);
 assert.equal((await repo.getOffering('industries',sector.id)).business_segments[0].solutions,'Booking system');
 const edited=await repo.saveOffering('services',{...created,slug:'catalog-renamed',industry_ids:[sector.id]},actor,created.updated_at);assert.equal(edited.industry_ids[0],sector.id);assert.equal(await repo.redirectsTo('services','catalog-test'),'catalog-renamed');
 await assert.rejects(repo.saveOffering('services',{...edited,name:'Stale'},actor,'2000-01-01T00:00:00.000Z'),/another window/);
 await repo.modifyOfferings('services',[edited.id],'unpublish',actor);assert.equal((await repo.listOfferings('services',true)).length,0);
 await assert.rejects(repo.modifyOfferings('services',[edited.id],'delete',{...actor,role:'editor'}),/super admin/);
 await repo.modifyOfferings('services',[edited.id],'publish',actor);await repo.reorderOfferings('services',[edited.id],actor);
 await repo.modifyOfferings('services',[edited.id],'delete',actor);assert.equal(await repo.getOffering('services',edited.id),null);assert.equal((await repo.listOfferings('services')).length,0);
 const audits=await db.execute(sql`select count(*)::int count from solynext_catalog.audit_log`);assert.ok(audits.rows[0].count>=7);
});
test('section validation and updates are audited',async()=>{const value={label:'Services',heading:'Our services',subheading:'',link_text:'View all',link_url:'/services',max_items:4};await repo.saveSection('home_services_section',value,actor);assert.equal((await repo.getSection('home_services_section')).max_items,4);await assert.rejects(repo.saveSection('home_services_section',{...value,max_items:0},actor));});
test('all eight supplied industries retain 53 business rows and the supplied service map',()=>{
 const industries=JSON.parse(fs.readFileSync(new URL('../db/seeds/industries.json',import.meta.url),'utf8'));
 assert.equal(industries.length,8);assert.equal(industries.reduce((sum,item)=>sum+item.business_segments.length,0),53);
 for(const item of industries){model.industrySchema.parse(item);assert.equal(item.capabilities.length>=6,true);assert.ok(item.service_slugs.includes('web-development'));assert.ok(item.service_slugs.includes('custom-utility-apps'));}
 assert.equal(industries.filter(item=>item.service_slugs.includes('ecommerce-development')).length,6);
 assert.equal(industries.filter(item=>item.service_slugs.includes('software-development')).length,5);
 assert.equal(industries.filter(item=>item.service_slugs.includes('mobile-development')).length,5);
 assert.throws(()=>model.industrySchema.parse({...industries[0],business_segments:[{name:'',solutions:''}]}));
});
