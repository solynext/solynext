"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ProjectForm } from "./ProjectForm";
export function ConsultationModal({ isOpen, onClose, defaultService="web-development" }: {isOpen:boolean;onClose:()=>void;defaultService?:string}) {
 const dialogRef=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const dialog=dialogRef.current;
  if(!isOpen||!dialog)return;
  const previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  dialog.showModal();document.body.style.overflow="hidden";
  return()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus();};
 },[isOpen]);
 return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={event=>{if(event.target===event.currentTarget)onClose();}}><div className="project-dialog-content"><button type="button" className="dialog-close" aria-label="Close project inquiry" onClick={onClose}><X size={20}/></button><p className="eyebrow">LET&apos;S TALK</p><h2 id="project-dialog-title">What are you working on?</h2><p>Share your idea. Let&apos;s explore the right next step.</p>{isOpen&&<ProjectForm defaultService={defaultService} onComplete={onClose}/>}</div></dialog>;
}
