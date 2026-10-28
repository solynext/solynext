import { readFile } from "node:fs/promises";
import path from "node:path";
export const runtime="nodejs";
export async function GET(_request:Request,{params}:{params:Promise<{filename:string}>}){
 const{filename}=await params;
 if(!/^[a-f0-9-]{36}\.webp$/.test(filename))return new Response("Not found",{status:404});
 try{
  // Custom uploads are runtime files, not project files to bundle.
  const bytes=process.env.CATALOG_UPLOAD_DIR
   ?await readFile(/* turbopackIgnore: true */ path.join(process.env.CATALOG_UPLOAD_DIR,filename))
   :await readFile(path.join(process.cwd(),".data","catalog-images",filename));
  return new Response(bytes,{headers:{"Content-Type":"image/webp","Cache-Control":"public,max-age=31536000,immutable","X-Content-Type-Options":"nosniff"}});
 }catch{return new Response("Not found",{status:404});}
}
