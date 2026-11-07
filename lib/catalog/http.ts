import "server-only";
import { ZodError,z } from "zod";
import { requestActor,enforceRate } from "./security";
import { listAdminOfferings,getOffering,saveOffering,modifyOfferings,reorderOfferings,previewLink,refreshCatalog,listDirectoryCategories,isDirectoryCategory,saveCategory,deleteCategory } from "./repository";
import { categorySchema,type Entity } from "./model";
export function apiError(error:unknown){const message=error instanceof Error?error.message:"Request failed.";const status=error instanceof ZodError?422:/Unauthorized/.test(message)?401:/Forbidden/.test(message)?403:/not found|no longer exists/.test(message)?404:/Rate limit/.test(message)?429:400;return Response.json({error:error instanceof ZodError?"Please check the highlighted fields.":message,fields:error instanceof ZodError?error.flatten().fieldErrors:undefined},{status,headers:{"Cache-Control":"no-store"}});}
const ids=z.array(z.string().uuid()).min(1).max(500);
export async function adminApi(request:Request,entity:Entity,path:string[]=[]){try{const actor=await requestActor(request);enforceRate(`admin:${actor.id}`,180);const[id,operation]=path;
 if(entity==="services"&&id==="categories"){
  if(request.method==="GET")return Response.json({items:await listDirectoryCategories()},{headers:{"Cache-Control":"no-store"}});
  if(request.method==="DELETE"&&operation){
   if(actor.role!=="super_admin")throw new Error("Forbidden: only a super admin can delete categories.");
   const slug=categorySchema.shape.slug.parse(operation);
   if(!isDirectoryCategory(slug))throw new Error("Category not found in the Services directory.");
   await deleteCategory(slug,actor);
  }else if(!operation&&(request.method==="POST"||request.method==="PUT")){
   const category=categorySchema.parse(await request.json());
   if(!isDirectoryCategory(category.slug))throw new Error("This category key is reserved by the legacy catalog.");
   await saveCategory(category,actor,request.method==="POST"?"create":"update");
  }else return Response.json({error:"Method not allowed"},{status:405});
  refreshCatalog();
  return Response.json({items:await listDirectoryCategories()},{status:request.method==="POST"?201:200});
 }
 async function getAdminItem(itemId: string) {
  const item = await getOffering(entity,itemId);
  if(entity==="services" && (!item || !("category" in item) || !isDirectoryCategory(item.category))) return null;
  return item;
 }
 async function requireDirectoryItems(itemIds: string[]) {
  if(entity!=="services")return;
  const items=await listAdminOfferings(entity);
  const keys=new Set(items.map(item=>item.id));
  if(itemIds.some(itemId=>!keys.has(itemId)))throw new Error("Service not found in the Services directory.");
 }
 if(request.method==="GET"){if(operation==="preview"){const itemId=z.string().uuid().parse(id);await requireDirectoryItems([itemId]);return Response.json({url:await previewLink(entity,itemId)},{headers:{"Cache-Control":"no-store"}});}if(id){const item=await getAdminItem(z.string().uuid().parse(id));if(!item)return Response.json({error:"Not found"},{status:404});return Response.json({item},{headers:{"Cache-Control":"no-store"}});}return Response.json({items:await listAdminOfferings(entity)},{headers:{"Cache-Control":"no-store"}});}
 const body=request.method==="DELETE"?{}:await request.json();
 if(request.method==="POST" && id==="reorder"){const data=z.object({ids,featured:z.boolean().optional()}).parse(body);await requireDirectoryItems(data.ids);await reorderOfferings(entity,data.ids,actor,data.featured);refreshCatalog();return Response.json({items:await listAdminOfferings(entity)});}
 if(request.method==="POST" && id==="bulk"){const data=z.object({ids,action:z.enum(["publish","unpublish","archive","delete","feature","unfeature"])}).parse(body);await requireDirectoryItems(data.ids);await modifyOfferings(entity,data.ids,data.action,actor);refreshCatalog();return Response.json({items:await listAdminOfferings(entity)});}
 if(request.method==="POST" && operation==="duplicate"){const item=await getAdminItem(z.string().uuid().parse(id));if(!item)throw new Error("Item not found.");const copy={...item,id:undefined,slug:item.slug+"-copy-"+crypto.randomUUID().slice(0,6),name:(item.name+" copy").slice(0,160),status:"draft",is_featured:false,featured_order:null};const saved=await saveOffering(entity,copy,actor);refreshCatalog();return Response.json({item:saved},{status:201});}
 if(request.method==="DELETE"){const itemId=z.string().uuid().parse(id);await requireDirectoryItems([itemId]);await modifyOfferings(entity,[itemId],"delete",actor);refreshCatalog();return Response.json({ok:true});}
 if((request.method==="POST"&&!id)||request.method==="PUT"){const itemId=request.method==="PUT"?z.string().uuid().parse(id):undefined;if(itemId)await requireDirectoryItems([itemId]);if(entity==="services"&&!isDirectoryCategory(body.category))throw new Error("Select a Services directory category.");const saved=await saveOffering(entity,{...body,id:itemId},actor,typeof body.expected_updated_at==="string"?body.expected_updated_at:undefined);refreshCatalog();return Response.json({item:saved},{status:request.method==="POST"?201:200});}
 return Response.json({error:"Method not allowed"},{status:405});
 }catch(error){return apiError(error);}}