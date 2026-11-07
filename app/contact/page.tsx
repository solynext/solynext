import { getPageMetadata } from "@/lib/seo/metadata";
import { ContactClient } from "./ContactClient";
import { publicOfferings } from "@/lib/catalog/repository";
import { InquiryForm } from "@/components/catalog/InquiryForm";
import { ArrowUpRight, Check, Mail, MapPin, MessageSquare } from "lucide-react";
import styles from "./Contact.module.css";
export async function generateMetadata(){return getPageMetadata("/contact");}
export default async function ContactPage({searchParams}:{searchParams:Promise<{service?:string;industry?:string;solution?:string}>}){
 const context=await searchParams;
 if(!context.service&&!context.industry&&!context.solution)return <ContactClient/>;
 const[services,industries]=await Promise.all([publicOfferings("services"),publicOfferings("industries")]);
 const partnership=context.solution?.toLowerCase().includes("partnership");
 return <main id="main-content" className={`premium-contact ${styles.page}`}><div className="premium-container"><div className={styles.layout}>
  <section className={styles.intro}>
   <p className="eyebrow">{partnership?"PARTNERSHIPS & COLLABORATION":"START A CONVERSATION"}</p>
   <h1>{partnership?<>Let&apos;s build<br/><span>together.</span></>:<>Your next idea.<br/><span>Starts here.</span></>}</h1>
   <p className={styles.description}>{partnership?"Share what you have in mind. We’ll explore how our teams, services, or ideas could work together.":"Tell us what you are planning. We’ll help you find a clear, practical next step."}</p>
   <a className={styles.emailCard} href="mailto:solynextsolutions@gmail.com"><span className={styles.icon}><Mail size={21}/></span><span><small>Email our team</small><strong>solynextsolutions@gmail.com</strong></span><ArrowUpRight size={18}/></a>
   <div className={styles.location}><MapPin size={17}/><span>Chota Lahore &amp; Lahore, Pakistan</span></div>
   <div className={styles.next}><h2>{partnership?"A straightforward start":"What happens next"}</h2><ul><li><Check size={16}/>{partnership?"Share your idea or opportunity":"Tell us what you need"}</li><li><Check size={16}/>{partnership?"Explore fit and responsibilities":"Discuss the right approach"}</li><li><Check size={16}/>{partnership?"Agree on a practical next step":"Plan the next step together"}</li></ul></div>
  </section>
  <section className={`contact-form-panel ${styles.panel} ${styles.inquiryPanel}`} aria-labelledby="contact-form-heading"><div className={styles.formHeading}><span className={styles.icon}><MessageSquare size={21}/></span><div><h2 id="contact-form-heading">{partnership?"Tell us about the partnership":"Tell us about your project"}</h2><p>A few details will help us start in the right place.</p></div></div><InquiryForm services={services} industries={industries} serviceSlug={context.service} industrySlug={context.industry} solution={context.solution}/></section>
 </div></div></main>;
}
