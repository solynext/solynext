import { z } from "zod";
export const models = ["Fixed-Price Milestone","Dedicated Engineering Team","Growth & SLA Retainer"] as const;
export const categories = ["build","design","grow","advise","support"] as const;
export const tags = ["BUILD","CREATE","GROW","CONNECT","SUPPORT","ADVISE"] as const;
export const defaultSteps = [
 { title:"Discover",description:"Understand your goals, users and the problem worth solving." },
 { title:"Design",description:"Shape the experience, prototype and define the architecture." },
 { title:"Develop",description:"Build in focused two-week sprints with reviews and working software." },
 { title:"Launch & Evolve",description:"Test, deploy and keep improving as your business grows." },
];
export const slugify=(value:string)=>value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const text=(max:number)=>z.string().trim().min(1).max(max);
const optionalText=(max:number)=>z.string().trim().max(max).default("");
const internalHref=z.string().trim().min(1).max(500).regex(/^\/(?!\/)[a-z0-9/_-]*(?:\?[a-z0-9._~%=&+-]*)?$/i,"Use an internal website URL.");
const list=z.array(text(500)).max(80).default([]);
const image=z.string().trim().max(2048).refine(value=>!value || /^\/api\/catalog-images\/[a-f0-9-]{36}\.webp$/.test(value) || /^\/images\/[a-zA-Z0-9_./-]+$/.test(value) || /^https:\/\//.test(value),"Use an uploaded image or HTTPS image URL.").nullable().default(null);
export const solutionSchema=z.object({name:text(160),description:optionalText(1000),status:z.enum(["ready","build"])});
export const faqSchema=z.object({question:text(300),answer:text(3000)});
const common={
 id:z.string().uuid().optional(),slug:text(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"Use lowercase words separated by hyphens."),name:text(160),tagline:text(300),card_summary:text(120),overview:text(30000),icon:text(60),hero_image:image,
 technologies:list,suggested_solutions:z.array(solutionSchema).max(40).default([]),faqs:z.array(faqSchema).max(40).default([]),
 cta_heading:text(200),cta_text:text(1000),seo_title:optionalText(200),seo_description:optionalText(500),og_image:image,
 is_featured:z.boolean().default(false),featured_order:z.number().int().min(0).max(9999).nullable().default(null),display_order:z.number().int().min(0).max(9999).default(0),status:z.enum(["draft","published","archived"]).default("draft"),
 project_ids:z.array(z.string().uuid()).max(100).default([]),
};
export const serviceSchema=z.object({...common,tag:z.enum(tags),category:z.enum(categories),what_we_deliver:list,who_its_for:list,deliverables:list,
 approach_steps:z.array(z.object({title:text(120),description:text(1500)})).length(4),engagement_options:z.array(z.enum(models)).min(1).max(3),industry_ids:z.array(z.string().uuid()).max(100).default([]),
});
export const businessSegmentSchema=z.object({name:text(160),solutions:text(2000)});
export const industrySchema=z.object({...common,business_segments:z.array(businessSegmentSchema).max(80).default([]),challenges:list,capabilities:list,outcomes:list,service_ids:z.array(z.string().uuid()).max(100).default([])});
export type ServiceInput=z.infer<typeof serviceSchema>;
export type IndustryInput=z.infer<typeof industrySchema>;
export type Entity="services"|"industries";
export type RecordMeta={id:string;created_at:string;updated_at:string;published_at:string|null;deleted_at:string|null};
export type Service=ServiceInput & RecordMeta;
export type Industry=IndustryInput & RecordMeta;
export type Offering=Service|Industry;
export type Project={id:string;slug:string;title:string;client_name:string;industry_summary:string;description:string;thumbnail:string;url:string;status:string;display_order:number};
export const sectionSchemas={
 home_services_section:z.object({label:text(120),heading:text(250),subheading:optionalText(1000),link_text:text(80),link_url:internalHref,max_items:z.number().int().min(1).max(20)}),
 services_page:z.object({hero_heading:text(250),hero_text:text(1000),primary_button:z.object({text:text(80),url:internalHref}),secondary_button:z.object({text:text(80),url:internalHref}),group_by_category:z.boolean(),show_industries_section:z.boolean(),show_process_section:z.boolean(),show_engagement_models:z.boolean(),show_faq:z.boolean(),final_cta_heading:text(250),final_cta_text:text(1000)}),
 home_industries_section:z.object({label:text(120),heading:text(250),subheading:optionalText(1000),link_text:text(80),link_url:internalHref,max_items:z.number().int().min(1).max(30)}),
 industries_page:z.object({hero_heading:text(250),hero_text:text(1000),final_cta_heading:text(250),final_cta_text:text(1000)}),
};
export type SectionKey=keyof typeof sectionSchemas;
export type HomeSection=z.infer<typeof sectionSchemas.home_services_section>;
export type ServicesPageSettings=z.infer<typeof sectionSchemas.services_page>;
export type IndustriesPageSettings=z.infer<typeof sectionSchemas.industries_page>;
export const inquirySchema=z.object({name:text(120),email:z.string().trim().email().max(254),phone:optionalText(50),company:optionalText(160),message:text(6000),source_page:z.string().max(500).regex(/^\/(services|solutions|contact)(\/|\?|$)/),service_slug:optionalText(140),industry_slug:optionalText(140),solution_name:optionalText(160),website:z.string().max(200).optional()});
export function emptyOffering(entity:Entity):ServiceInput|IndustryInput {
 const shared={slug:"",name:"",tagline:"",card_summary:"",overview:"",icon:entity==="services"?"Laptop":"Building2",hero_image:null,technologies:[],suggested_solutions:[],faqs:[],cta_heading:"Tell us about your project",cta_text:"Just the essentials. We can work through the details together.",seo_title:"",seo_description:"",og_image:null,is_featured:false,featured_order:null,display_order:0,status:"draft" as const,project_ids:[]};
 return entity==="services"?{...shared,tag:"BUILD",category:"build",what_we_deliver:[],who_its_for:[],deliverables:["Full source code and IP ownership"],approach_steps:defaultSteps,engagement_options:[...models],industry_ids:[]}:{...shared,business_segments:[],challenges:[],capabilities:[],outcomes:[],service_ids:[]};
}
