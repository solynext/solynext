import { sql } from "drizzle-orm";
import { getCatalogDb } from "./db";
export async function lookupCatalogRedirect(pathname:string){
 const match=pathname.match(/^\/(services|industries)\/([a-z0-9-]+)\/?$/);
 if(!match||!process.env.DATABASE_URL)return null;
 const entity=match[1]==="services"?"services":"industries";
 try{
  const result=await getCatalogDb().execute<{new_slug:string}>(sql`select new_slug from solynext_catalog.slug_redirects where entity=${entity} and old_slug=${match[2]}`);
  return result.rows[0]?`/${match[1]}/${result.rows[0].new_slug}`:null;
 }catch{
  // Redirect lookup is best-effort. Missing/unavailable redirect data must not block the requested page.
  return null;
 }
}
