import { adminApi } from '@/lib/catalog/http';
export const runtime='nodejs';
async function handle(request:Request,{params}:{params:Promise<{path?:string[]}>}){return adminApi(request,'services',(await params).path);}
export {handle as GET,handle as POST,handle as PUT,handle as DELETE};