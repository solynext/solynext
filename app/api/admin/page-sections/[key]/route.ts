import { sectionSchemas,type SectionKey } from "@/lib/catalog/model";
import { getSection,saveSection,refreshCatalog } from "@/lib/catalog/repository";
import { requestActor } from "@/lib/catalog/security";
import { apiError } from "@/lib/catalog/http";
async function handle(request:Request,{params}:{params:Promise<{key:string}>}){try{const actor=await requestActor(request);const{key}=await params;if(!Object.hasOwn(sectionSchemas,key))return Response.json({error:"Not found"},{status:404});const section=key as SectionKey;if(request.method==="GET")return Response.json({data:await getSection(section)},{headers:{"Cache-Control":"no-store"}});const data=await saveSection(section,await request.json(),actor);refreshCatalog();return Response.json({data});}catch(error){return apiError(error);}}
export {handle as GET,handle as PUT};