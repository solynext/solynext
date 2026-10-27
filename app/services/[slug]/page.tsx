import { notFound } from 'next/navigation';
import { getOffering } from '@/lib/catalog/repository';
import { validPreview } from '@/lib/catalog/security';
import { getSeoSettings } from '@/lib/seo/repository';
import { DetailView } from '@/components/catalog/DetailView';
type Props={params:Promise<{slug:string}>;searchParams:Promise<{preview?:string}>};
async function load(props:Props){const{slug}=await props.params;const item=await getOffering('services',slug);if(!item)notFound();const token=(await props.searchParams).preview;const preview=validPreview(token,'services',item.id);if(item.status!=='published'&&!preview)notFound();return{item,preview};}
export async function generateMetadata(props:Props){const{item,preview}=await load(props);const seo=await getSeoSettings();return{title:item.seo_title||item.name+' | SolyNext',description:item.seo_description||item.card_summary,robots:preview?{index:false,follow:false}:undefined,alternates:seo.siteUrl?{canonical:seo.siteUrl+'/services/'+item.slug}:undefined,openGraph:{title:item.seo_title||item.name,description:item.seo_description||item.card_summary,images:item.og_image||item.hero_image?[{url:item.og_image||item.hero_image!}]:[]}};}
export default async function DetailPage(props:Props){const{item,preview}=await load(props);return <DetailView entity='services' item={item} preview={preview}/>;}