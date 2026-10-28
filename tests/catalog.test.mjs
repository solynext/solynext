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

test('supplied sub-services retain every business mapping',()=>{
 assert.equal(seeds.reduce((sum,item)=>sum+item.sub_services.length,0),101);
 assert.equal(seeds[0].sub_services.find(row=>row.name==='School and college websites').businesses,'Schools, colleges, academies, training institutes');
 for(const seed of seeds){const parsed=model.serviceSchema.parse(seed);assert.equal(parsed.sub_services.length,seed.sub_services.length);}
 assert.throws(()=>model.serviceSchema.parse({...seeds[0],sub_services:[{name:'',businesses:'Retail'}]}));
});
test('category CRUD enforces assignments and public collections hydrate reciprocal links',async()=>{
 await repo.saveCategory({slug:'automation',name:'Automation',display_order:8},actor);
 assert.ok((await repo.listCategories()).some(row=>row.slug==='automation'));
 const sector=await repo.saveOffering('industries',{...model.emptyOffering('industries'),name:'Connected sector',slug:'connected-sector',tagline:'Sector',card_summary:'Connected sector',overview:'<p>Sector</p>',status:'published'},actor);
 const service=await repo.saveOffering('services',{...seeds[0],slug:'connected-service',name:'Connected service',category:'automation',industry_ids:[sector.id],portfolio_ids:['stable-project-id'],app_ids:['stable-product-id']},actor);
 const collection=await repo.listOfferings('services',true),industryCollection=await repo.listOfferings('industries',true);
 assert.ok(collection.find(row=>row.id===service.id).industry_ids.includes(sector.id));
 assert.ok(industryCollection.find(row=>row.id===sector.id).service_ids.includes(service.id));
 assert.deepEqual(Array.from((await repo.getOffering('services',service.id)).portfolio_ids),['stable-project-id']);
 assert.deepEqual(Array.from((await repo.getOffering('services',service.id)).app_ids),['stable-product-id']);
 await assert.rejects(repo.deleteCategory('automation',actor),/Move services/);
 await repo.saveCategory({slug:'automation',name:'Business Automation',display_order:2},actor);
 assert.equal((await repo.listCategories()).find(row=>row.slug==='automation').name,'Business Automation');
 await repo.saveOffering('services',{...service,category:'build'},actor);
 await repo.deleteCategory('automation',actor);
 assert.ok(!(await repo.listCategories()).some(row=>row.slug==='automation'));
});
test('industry content contains useful overviews, challenges, outcomes and FAQs',()=>{
 const industries=JSON.parse(fs.readFileSync(new URL('../db/seeds/industries.json',import.meta.url),'utf8'));
 for(const industry of industries){assert.ok(industry.overview.length>300);assert.ok(industry.challenges.length>=3);assert.ok(industry.outcomes.length>=3);assert.ok(industry.faqs.length>=3);}
});

test('home placement requires published AND featured with stable featured order and a limit',()=>{
 const items=[{id:'draft',status:'draft',is_featured:true,featured_order:0,display_order:0},{id:'hidden',status:'published',is_featured:false,featured_order:0,display_order:0},{id:'later',status:'published',is_featured:true,featured_order:2,display_order:0},{id:'first',status:'published',is_featured:true,featured_order:1,display_order:1}];
 assert.deepEqual(Array.from(model.featuredOfferings(items,1),row=>row.id),['first']);
 assert.equal(model.featuredOfferings(items.slice(0,2),8).length,0);
 assert.equal(items[2].id,'later');
});

test('industry portfolio migration fills missing links without replacing custom selections',async()=>{
 const base={...model.emptyOffering('industries'),tagline:'A useful industry',card_summary:'Industry summary',overview:'<p>Industry overview</p>',status:'published'};
 const automotive=await repo.saveOffering('industries',{...base,slug:'transport-automotive',name:'Automotive'},actor);
 const property=await repo.saveOffering('industries',{...base,slug:'real-estate',name:'Property',portfolio_ids:['custom-project']},actor);
 await pg.exec(fs.readFileSync(new URL('../db/migrations/005_industry_portfolio_links.sql',import.meta.url),'utf8'));
 assert.deepEqual(Array.from((await repo.getOffering('industries',automotive.id)).portfolio_ids),['pak-auto-parts']);
 assert.deepEqual(Array.from((await repo.getOffering('industries',property.id)).portfolio_ids),['custom-project']);
});
