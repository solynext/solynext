import { BLOG_POSTS_DATA } from "@/data/mockData";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { InsightCard } from "@/components/ui/InsightCard";

export function InsightsSection() {
  return <section className="premium-section insights-section" id="insights"><div className="premium-container"><EditorialHeading kicker="IDEAS FROM THE TEAM" title={<>A little perspective.<br />A better next decision.</>} description="Explore our thinking on engineering, product design, and building technology for a global audience." href="/blog" linkLabel="Explore all insights" /><div className="insights-grid">{BLOG_POSTS_DATA.slice(0, 3).map((post, index) => <InsightCard key={post.id} post={post} index={index} />)}</div></div></section>;
}
