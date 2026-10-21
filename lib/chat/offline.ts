import { getPredefinedReply } from "./responses";
import { analyzeQuestion } from "./analysis";
import { classifyIntent, detectLanguage } from "./intelligence";
import type { ChatMessage, ChatReply } from "./types";

const definitions: [RegExp, string][] = [
  [/\breact\b/i, "React is a JavaScript library for building interactive user interfaces. You build reusable components, pass data through props, and manage changing information with state."],
  [/\bnext\.?js\b/i, "Next.js is a React framework for building web applications. It adds routing, server rendering, server-side endpoints, and deployment features. Its exact APIs depend on the version you use."],
  [/\btypescript\b/i, "TypeScript adds static type checking to JavaScript. Types help catch mistakes during development and make larger codebases easier to maintain; they do not replace runtime validation."],
  [/\bpython\b/i, "Python is a general-purpose programming language used for automation, web backends, data analysis, and AI. Its readable syntax makes it approachable for beginners."],
  [/\b(rest|api)\b/i, "An API lets software systems communicate through a defined interface. A REST API commonly exposes resources over HTTP, using methods such as GET, POST, PATCH, and DELETE."],
  [/\bgraphql\b/i, "GraphQL is a query language and execution system for APIs. Clients request specific fields through a schema, while server resolvers retrieve the data. It is an alternative to REST, not a database."],
  [/\b(sql|postgresql|mysql)\b/i, "SQL is a language for querying relational databases. PostgreSQL and MySQL store structured data in tables and support transactions, joins, and constraints. The best choice depends on your application and hosting needs."],
  [/\b(ui\/?ux|user experience|ux design)\b/i, "UX design focuses on how well a product meets user needs; UI design shapes its visual interface and interactions. Research, user journeys, wireframes, prototypes, accessibility, and usability testing help connect both."],
  [/\bfigma\b/i, "Figma is a collaborative interface design and prototyping tool. Teams use it for layouts, reusable components, design systems, interactive prototypes, and developer handoff."],
  [/\b(logo|branding|graphic design)\b/i, "Graphic design communicates ideas through typography, imagery, color, and layout. A logo is one part of a wider brand identity, which also includes visual rules, messaging, and consistent use across materials."],
  [/\b(seo|search engine optimization)\b/i, "SEO helps search engines discover, understand, and rank useful content. Start with crawlable pages, relevant content, descriptive titles, fast mobile experiences, and accessible structure. Rankings and traffic are never guaranteed."],
  [/\bdocker\b/i, "Docker packages applications and their dependencies into containers, making environments more consistent. Containers share the host kernel; they are not the same as full virtual machines."],
  [/\b(machine learning|ai|artificial intelligence)\b/i, "AI is a broad field concerned with systems that perform tasks such as language understanding, prediction, and pattern recognition. Machine learning develops models from data. Integrating an existing model is different from training or fine-tuning one."],
  [/\b(dns|ssl|https)\b/i, "DNS maps domain names to network addresses. HTTPS uses TLS to encrypt and authenticate the connection between a browser and a server. A valid certificate does not by itself make an application secure."],
  [/\b(git|github)\b/i, "Git tracks changes to source code and supports branching and merging. GitHub hosts Git repositories and adds collaboration tools such as pull requests, issues, and automated workflows."],
];

/** Bounded arithmetic parser. No eval, generated code, variables or external execution. */
export function calculateBasic(message: string): number | null {
  const match = message.trim().match(/^(?:(?:what is|calculate|solve)\s+)?([\d\s.+*/()\-]+)[?=]?$/i);
  if (!match || match[1].length > 100) return null;
  const tokens = match[1].match(/\d+(?:\.\d+)?|\.\d+|[()+*/-]/g);
  if (!tokens || tokens.length > 64 || tokens.join("") !== match[1].replace(/\s/g, "")) return null;
  let index = 0;
  function factor(depth: number): number {
    if (depth > 16) throw new Error("Expression too deep");
    const token = tokens![index++];
    if (token === "+") return factor(depth + 1);
    if (token === "-") return -factor(depth + 1);
    if (token === "(") { const value = expression(depth + 1); if (tokens![index++] !== ")") throw new Error("Missing bracket"); return value; }
    if (!token || !/^(\d+(\.\d+)?|\.\d+)$/.test(token)) throw new Error("Invalid number");
    return Number(token);
  }
  function term(depth: number): number {
    let value = factor(depth);
    while (["*", "/"].includes(tokens![index])) { const operator = tokens![index++]; const next = factor(depth); value = operator === "*" ? value * next : value / next; }
    return value;
  }
  function expression(depth: number): number {
    let value = term(depth);
    while (["+", "-"].includes(tokens![index])) { const operator = tokens![index++]; const next = term(depth); value = operator === "+" ? value + next : value - next; }
    return value;
  }
  try { const result = expression(0); return index === tokens.length && Number.isFinite(result) && Math.abs(result) <= Number.MAX_SAFE_INTEGER ? Number(result.toPrecision(12)) : null; }
  catch { return null; }
}

/** Honest limited answers for missing credentials, outages and offline browsers. */
export function getOfflineReply(message: string, history: ChatMessage[] = []): ChatReply {
  const language = detectLanguage(message);
  const intent = classifyIntent(message, history);
  if (/system prompt|api key|environment variable|internal instructions|hidden instructions/i.test(message)) return { text: "I can't access or reveal credentials or internal instructions. I can help explain how to keep application secrets secure." };
  if (/capital.*pakistan|pakistan.*capital|پاکستان.*دارالحکومت|پاکستان کا دارالحکومت|pakistan.*dar.?ul.?hakoomat/i.test(message)) return { text: language === "ur" ? "پاکستان کا دارالحکومت اسلام آباد ہے۔" : language === "roman-ur" ? "Pakistan ka dar-ul-hakoomat Islamabad hai." : "Islamabad is the capital of Pakistan." };
  if (/ass?alam|salam|السلام|alaikum/i.test(message) && intent === "conversation") return { text: language === "ur" ? "وعلیکم السلام! میں ٹھیک ہوں۔ آپ کو کس چیز میں مدد چاہیے؟" : "Wa Alaikum Assalam! Main theek hoon. Aap ko kis cheez mein help chahiye?" };
  if (/^(hi|hello|hey|good morning)[!.\s]*$/i.test(message)) return { text: "Hi! What can I help you with?" };
  if (/^(thanks|thank you|shukriya|شکریہ)[!.\s]*$/i.test(message)) return { text: language === "en" ? "You're welcome!" : language === "ur" ? "خوش رہیں!" : "Khushi hui madad kar ke!" };
  const calculation = calculateBasic(message);
  if (calculation !== null) return { text: String(calculation) };
  if (intent === "troubleshooting" && /next\.?js|vercel/i.test(message)) return { text: "Let's identify the deployment issue. Share the exact build error or the first failing line from the deployment log, with secrets removed. Check that required environment variables are set, the Node.js version matches your project, dependencies are locked, and the build command succeeds locally. Those are checks, not a diagnosis yet.", links: [{ label: "Vercel deployment docs", href: "https://vercel.com/docs/deployments" }] };
  if (intent === "explanation") {
    if (/react/i.test(message) && language !== "en") return { text: language === "ur" ? "React جاوا اسکرپٹ کی ایک لائبریری ہے جس سے انٹرایکٹو یوزر انٹرفیس بنائے جاتے ہیں۔ دوبارہ استعمال ہونے والے کمپوننٹس، props اور state کی مدد سے انٹرفیس کو منظم کیا جاتا ہے۔" : "React JavaScript ki library hai jo interactive user interfaces banane ke kaam aati hai. Reusable components, props aur state se interface ko organize kiya jata hai." };
    if (language === "en") {
      const fact = definitions.find(([pattern]) => pattern.test(message));
      if (fact) return { text: fact[1] };
    }
  }
  if (intent === "service" || intent === "quotation") {
    if (language !== "en") return { text: language === "ur" ? "ہم آپ کے پروجیکٹ کی ضروریات سمجھنے میں مدد کر سکتے ہیں۔ آپ کیا بنوانا چاہتے ہیں اور اس کے اہم فیچرز کیا ہوں گے؟ حتمی قیمت اور دستیابی کی تصدیق ٹیم کرے گی۔" : "Hum aap ke project ki requirements samajhne mein madad kar sakte hain. Aap kya banwana chahte hain aur zaroori features kya honge? Final pricing aur availability team confirm karegi.", links: [{ label: "Contact SolyNext", href: "/contact" }] };
    const reply = getPredefinedReply(message, history);
    if (!reply.text.startsWith("Sorry,")) return reply;
  }
  const priorProject = analyzeQuestion(message, history);
  if (language === "en" && priorProject.relevance !== "irrelevant" && (priorProject.usedContext || ["service", "quotation", "general"].includes(intent))) return getPredefinedReply(message, history);
  return { text: language === "ur" ? "اس وقت مکمل AI گفتگو فعال نہیں ہے۔ میں کچھ عمومی اور SolyNext سے متعلق سوالات کے مختصر جواب دے سکتا ہوں، لیکن اس سوال کا قابلِ اعتماد تفصیلی جواب ابھی نہیں دے سکتا۔" : language === "roman-ur" ? "Abhi full AI conversation active nahin hai. Main kuch basic aur SolyNext ke sawalon mein madad kar sakta hoon, lekin is sawal ka reliable detailed jawab abhi nahin de sakta." : "Full AI conversation isn't available right now. I can answer some basic questions and help with SolyNext services, but I don't have a reliable detailed answer to this question in offline mode." };
}
