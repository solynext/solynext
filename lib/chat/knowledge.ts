import "server-only";
import { companyKnowledge, type KnowledgeEntry } from "@/data/chat/knowledge";
import { SERVICES_DATA, FAQS_DATA, TECHNOLOGIES_DATA, BLOG_POSTS_DATA } from "@/data/mockData";

export function buildKnowledge(): KnowledgeEntry[] {
  return [
    ...companyKnowledge,
    ...SERVICES_DATA.map(service => ({ id: `service:${service.slug}`, title: service.title, href: `/services/${service.slug}`, keywords: [service.category, ...service.technologies], content: [service.tagline, service.fullDescription, `Features: ${service.features.join("; ")}`, `Deliverables: ${service.deliverables.join("; ")}`, `Indicative timeline: ${service.estimatedTimeline}. Engagement: ${service.startingPriceTier}. Confirm scope and commitments with the team.`].join("\n") })),
    ...FAQS_DATA.map((faq, index) => ({ id: `faq:${index}`, title: faq.question, href: "/", keywords: [faq.category], content: faq.answer })),
    ...TECHNOLOGIES_DATA.map(technology => ({ id: `technology:${technology.name}`, title: technology.name, href: "/technologies", keywords: [technology.category, ...technology.popularUseCases], content: `${technology.description}\nPublished expertise: ${technology.proficiencyLevel}.` })),
    ...BLOG_POSTS_DATA.map(post => ({ id: `article:${post.slug}`, title: post.title, href: `/blog/${post.slug}`, keywords: post.tags, content: [post.excerpt, ...post.content].join("\n") })),
  ];
}

const aliases: [RegExp, string][] = [
  [/ویب|website|websites|web development|سائٹ/giu, "web website engineering"],
  [/ڈیزائن|figma|ui\/ux|uiux|design/giu, "design ui ux product figma"],
  [/ایپ|موبائل|mobile|android|ios/giu, "mobile apps applications"],
  [/قیمت|لاگت|kitna|qeemat|quotation|quote|cost/giu, "pricing quotation budget estimate"],
  [/مارکیٹنگ|تشہیر|marketing/giu, "marketing seo social digital"],
  [/مصنوعی ذہانت|automation|chatbot/giu, "ai integration automation software"],
];
const stopWords = new Set("the a an is are of in to for with and or can you me my your it this that do does what how i we us about please help have on be as at by from our would could tell".split(" "));
export function knowledgeTerms(text: string) {
  const expanded = aliases.reduce((value, [pattern, replacement]) => value.replace(pattern, match => `${match} ${replacement}`), text.toLowerCase());
  return [...new Set((expanded.match(/[\p{L}\p{N}][\p{L}\p{N}+#.-]*/gu) ?? []).filter(word => word.length > 1 && !stopWords.has(word)))].slice(0, 100);
}

/** Small-site lexical RAG: weighted title/keyword matching plus inverse document frequency. */
export function retrieveKnowledge(entries: KnowledgeEntry[], query: string, currentPage?: string, budget = 16000): KnowledgeEntry[] {
  const terms = knowledgeTerms(query);
  const corpus = entries.map(entry => ({ entry, title: knowledgeTerms(entry.title), keys: knowledgeTerms(entry.keywords.join(" ")), body: knowledgeTerms(entry.content) }));
  const frequency = new Map(terms.map(term => [term, corpus.filter(doc => [...doc.title, ...doc.keys, ...doc.body].includes(term)).length]));
  const ranked = corpus.map(doc => ({ entry: doc.entry, score: terms.reduce((score, term) => {
    const idf = Math.log(1 + entries.length / (1 + (frequency.get(term) ?? 0)));
    return score + idf * ((doc.title.includes(term) ? 4 : 0) + (doc.keys.includes(term) ? 2 : 0) + (doc.body.includes(term) ? 1 : 0));
  }, doc.entry.href === currentPage ? 5 : 0) })).filter(doc => doc.score > 0).sort((a, b) => b.score - a.score);
  const selected: KnowledgeEntry[] = [];
  let used = 0;
  for (const { entry } of ranked) {
    if (selected.length === 6 || used >= budget) break;
    const content = entry.content.slice(0, Math.min(3000, budget - used));
    if (!content) break;
    selected.push({ ...entry, content });
    used += content.length;
  }
  return selected;
}
