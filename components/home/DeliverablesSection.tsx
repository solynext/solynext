import { cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, FileCode2, BookOpen, Rocket, GitBranch, Check } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

const deliverables = [
  { icon: FileCode2, title: "A codebase you own", description: "Source code and IP handed over to you." },
  { icon: BookOpen, title: "Documentation with context", description: "Clear architecture notes and setup guides." },
  { icon: Rocket, title: "A considered launch", description: "Testing and deployment within your agreed scope." },
  { icon: GitBranch, title: "Visibility along the way", description: "Working builds and regular sprint reviews." },
];
export function DeliverablesSection() {
  return <section className="premium-section deliverables-section" id="deliverables"><div className="premium-container deliverables-layout"><div><EditorialHeading kicker="MORE THAN A FINISHED INTERFACE" title={<>Built. Documented.<br />Ready for what follows.</>} description="A useful product needs a thoughtful handover. We plan the foundations, delivery, and next steps with your team." /><Link href="/process" className="p-text-link">See how delivery works <ArrowUpRight size={18} /></Link><div className="handover-preview" aria-label="Illustrative project handover checklist"><div><span className="status-dot" /><span>YOUR PROJECT / HANDOVER</span></div>{["Source code & repositories", "Architecture & setup guides", "Deployment & release notes"].map(label => <p key={label}><Check size={16} />{label}</p>)}<small>Deliverables agreed with your project scope.</small></div></div><div className="deliverables-list">{deliverables.map(({ icon: Icon, title, description }) => <article className="deliverable-item visual-card" key={title} data-card-tone={cardTone(title)}><span className="capability-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>;
}
