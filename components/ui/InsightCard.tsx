import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, Braces, PenTool, Globe2 } from "lucide-react";
import type { BlogPost } from "@/types";

export function InsightCard({ post, index }: { post: BlogPost; index: number }) {
  const Icon = [Braces, PenTool, Globe2][index % 3];
  return <Link href={`/blog/${post.slug}`} className="insight-card visual-card" data-card-tone={cardTone(post.category)}><div className={`insight-art insight-art-${index % 3}`} aria-hidden="true"><CardMotif kind={post.category} /><Icon size={58} strokeWidth={1.2} /><span>{post.category}</span></div><div className="insight-card-content"><div className="insight-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="insight-card-bottom"><span>{post.publishedDate}</span><ArrowUpRight size={20} /></div></div></Link>;
}
