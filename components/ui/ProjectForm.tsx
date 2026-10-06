"use client";
import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
const recipient = "solynextsolutions@gmail.com";
export function ProjectForm({ defaultService = "", onComplete }: { defaultService?: string; onComplete?: () => void }) {
 const [ready,setReady]=useState(false);
 const [emailLink,setEmailLink]=useState("");
 function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const subject=`Project inquiry${data.get("service") ? ` — ${data.get("service")}` : ""}`;
  const body=`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service") || "Let's discuss"}\n\n${data.get("details")}`;
  const link=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setEmailLink(link);setReady(true);window.location.href=link;
 }
 return <form className="project-form" onSubmit={submit}>
  <div className="form-pair"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name" maxLength={120}/></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" maxLength={254}/></label></div>
  <label>What can we help you with?<select name="service" defaultValue={defaultService}><option value="">Let&apos;s discuss</option><option value="web-development">Web application development</option><option value="software-development">Custom software</option><option value="mobile-development">Mobile applications</option><option value="ui-ux-design">UI/UX & product design</option><option value="graphic-design-branding">Brand identity</option><option value="digital-marketing">Digital marketing & SEO</option><option value="social-media-management">Social media management</option><option value="video-production-motion">Video & motion graphics</option></select></label>
  <label>A little about your project<textarea name="details" required rows={5} maxLength={4000} placeholder="What would you like to build or improve? Share your goals and any timeline you have in mind."/></label>
  <p className="form-disclosure">This opens an email draft. Send it from your email app to complete your inquiry.</p>
  <button type="submit" className="p-button">Prepare project inquiry <ArrowUpRight size={18}/></button>
  {ready&&<div className="form-status" role="status"><Mail size={20}/><div><strong>Your inquiry is ready to send.</strong><p>No message has been sent by this website. If your email app didn&apos;t open, <a href={emailLink}>open the draft again</a> or email <a href={`mailto:${recipient}`}>{recipient}</a>.</p>{onComplete&&<button type="button" onClick={onComplete}>Close</button>}</div></div>}
 </form>;
}

