import { cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types";

export function InsightCard({ post }: { post: BlogPost; index: number }) {
 return <Link href={`/blog/${post.slug}`} className="insight-card visual-card" data-card-tone={cardTone(post.category)}><div className="insight-card-content"><div className="insight-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><div className="insight-card-bottom"><span>Read article</span><ArrowUpRight size={18} aria-hidden="true"/></div></div></Link>;
}
