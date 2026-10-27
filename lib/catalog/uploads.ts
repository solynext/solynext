"use server";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { actorByEmail } from "./security";
import { mkdir,writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
export async function uploadCatalogImage(form:FormData){const session=await requireAdmin(true);await actorByEmail(session.user.email);const file=form.get("file");if(!(file instanceof File)||file.size===0||file.size>4*1024*1024||!["image/png","image/jpeg","image/webp"].includes(file.type))return{error:"Upload a JPG, PNG or WebP image up to 4 MB."};try{const bytes=await sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:40000000}).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toBuffer();const name=crypto.randomUUID()+".webp";const directory=process.env.CATALOG_UPLOAD_DIR||path.join(process.cwd(),".data","catalog-images");await mkdir(directory,{recursive:true});await writeFile(path.join(directory,name),bytes);return{url:"/api/catalog-images/"+name};}catch{return{error:"This image could not be read."};}}