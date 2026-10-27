import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { SQL } from "drizzle-orm";
export interface CatalogDatabase {
 execute<T=Record<string,unknown>>(query:SQL):Promise<{rows:T[]}>;
 transaction<T>(run:(tx:CatalogDatabase)=>Promise<T>):Promise<T>;
}
const scope=globalThis as typeof globalThis & {catalogDb?:CatalogDatabase;catalogPool?:Pool};
export function getCatalogDb():CatalogDatabase {
 if(!process.env.DATABASE_URL)throw new Error("Configure DATABASE_URL, then run npm run catalog:migrate and npm run catalog:seed.");
 if(!scope.catalogDb){scope.catalogPool=new Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:10000});scope.catalogDb=drizzle(scope.catalogPool) as unknown as CatalogDatabase;}
 return scope.catalogDb;
}