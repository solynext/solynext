import { portfolioStore } from "@/lib/portfolio/repository";
import { appStore } from "@/lib/apps/repository";
import { notFound } from "next/navigation";
import { adminBootstrap } from "@/lib/catalog/security";
import { listOfferings,getSection,listCategories } from "@/lib/catalog/repository";
import type { Entity,SectionKey,HomeSection } from "@/lib/catalog/model";
import { CatalogManager } from "./Manager";
import { SettingsEditor } from "./SettingsEditor";
export async function CatalogAdminPage({entity}:{entity:Entity}){const{actor,token}=await adminBootstrap();const[items,relations,home,categories,portfolio,apps,services]=await Promise.all([listOfferings(entity),listOfferings(entity==="services"?"industries":"services"),getSection(entity==="services"?"home_services_section":"home_industries_section"),listCategories(),portfolioStore.read(),appStore.read(),listOfferings("services")]);return <CatalogManager entity={entity} initialCategories={categories} portfolio={portfolio.map(row=>({id:row.id,name:row.title}))} apps={apps.map(row=>({id:row.id,name:row.name}))} services={services} initialItems={items} relations={relations} token={token} role={actor.role} maxFeatured={(home as HomeSection).max_items}/>;}
export async function CatalogSettingsPage({entity,type}:{entity:Entity;type:string}){if(!["home-section","listing-page"].includes(type))notFound();const{token}=await adminBootstrap();const key:SectionKey=type==="home-section"?(entity==="services"?"home_services_section":"home_industries_section"):(entity==="services"?"services_page":"industries_page");const[data,items]=await Promise.all([getSection(key),listOfferings(entity)]);return <SettingsEditor entity={entity} sectionKey={key} initialData={data} items={items} token={token}/>;}