import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function EditorialHeading({ kicker, title, description, href, linkLabel }: {
  kicker: string; title: ReactNode; description?: string; href?: string; linkLabel?: string;
}) {
  return <div className="p-section-heading"><div><p className="eyebrow">{kicker}</p><h2>{title}</h2></div><div className="heading-aside">{description && <p>{description}</p>}{href && <Link href={href} className="p-text-link">{linkLabel}<ArrowUpRight size={17} /></Link>}</div></div>;
}
