import { adminBootstrap } from "@/lib/catalog/security";
import { projectsList } from "@/lib/catalog/repository";
import { RelatedWorkEditor } from "@/components/catalog/admin/RelatedWorkEditor";
export default async function Page(){const{token}=await adminBootstrap();return <RelatedWorkEditor initialItems={await projectsList()} token={token}/>;}