"use client";
import { useEffect, useId, useRef } from "react";
import { MessageSquareText, X } from "lucide-react";
import { ProjectForm } from "./ProjectForm";
export function ConsultationModal({ isOpen, onClose, defaultService="web-development", inquiryCard=false }: {isOpen:boolean;onClose:()=>void;defaultService?:string;inquiryCard?:boolean}) {
 const dialogRef=useRef<HTMLDialogElement>(null);
 const titleId=useId();
 useEffect(()=>{
  const dialog=dialogRef.current;
  if(!isOpen||!dialog)return;
  const previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  dialog.showModal();document.body.style.overflow="hidden";
  return()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus();};
 },[isOpen]);
 return <dialog ref={dialogRef} className="project-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={event=>{if(event.target===event.currentTarget)onClose();}}><div className="project-dialog-content"><button type="button" className="dialog-close" aria-label="Close project inquiry" onClick={onClose}><X size={20}/></button><div className="inquiry-heading"><span className="inquiry-icon" aria-hidden="true"><MessageSquareText size={24}/></span><p className="eyebrow">LET&apos;S TALK</p><h2 id={titleId}>{inquiryCard ? "Tell us about your project" : "What are you working on?"}</h2><p>{inquiryCard ? "Just the essentials. We can work through the details together." : "Share your idea. Let's explore the right next step."}</p></div>{isOpen&&<ProjectForm defaultService={defaultService} onComplete={onClose}/>}</div></dialog>;
}
