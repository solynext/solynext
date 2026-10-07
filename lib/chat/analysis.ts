import type { ChatMessage } from "./types";

export type ServiceIntent = "web" | "ecommerce" | "mobile" | "software" | "ux" | "graphics" | "marketing" | "social" | "video";
export type QuestionIntent = ServiceIntent | "services" | "project" | "estimate" | "technology" | "ai" | "clarify" | "greeting" | "acknowledgement" | "unrelated";
export interface ConversationContext {
  solution?: ServiceIntent;
  industry?: string;
  platform?: "Android" | "iOS" | "Android and iOS";
  features: string[];
}
export interface QuestionAnalysis {
  intent: QuestionIntent;
  relevance: "highly-relevant" | "partially-relevant" | "irrelevant";
  score: number;
  context: ConversationContext;
  usedContext: boolean;
  evidence: string[];
}

export function normalizeQuestion(message: string) {
  return message.toLowerCase().replace(/[’']/g, "").replace(/e[ -]?commerce/g, "ecommerce")
    .replace(/web\s*site/g, "website").replace(/on[ -]?line/g, "online").replace(/[^a-z0-9/\s.-]/g, " ").replace(/\s+/g, " ").trim();
}

const solutionPatterns: [ServiceIntent, RegExp][] = [
  ["ux", /\b(ui\/ux|ui|ux|user experience|user interface|product design|wireframes?|prototypes?|figma|design system|hard to (use|navigate)|confusing (interface|screens?))\b/],
  ["graphics", /\b(logos?|branding|brand identity|graphics?|illustrations?|posters?|visual identity|social media designs?|social media graphics|brand materials)\b/],
  ["video", /\b(video editing|edit (a |my |our )?videos?|video production|motion graphics|animations?|explainer|reels|promotional videos?|product videos?)\b/],
  ["social", /\b(social media|social content|instagram|facebook|linkedin|tiktok|manage (our |my )?(social |business )?accounts|content calendar)\b/],
  ["marketing", /\b(digital marketing|marketing|seo|advertising|ads|digital campaigns?|search engines?|rank (on|in) google|traffic|lead generation)\b/],
  ["ecommerce", /\b(ecommerce|online (store|shop)|shopping cart|checkout|sell (my |our )?(products|clothes|clothing|items) online)\b/],
  ["web", /\b(websites?|web (apps?|applications?|development|design)|landing pages?|customer portals?|next\.?js|react(?! native)|site for|business site|online presence)\b/],
  ["mobile", /\b(mobile (apps?|applications?|development)|android|ios|iphone|react native|apps?|application for)\b/],
  ["software", /\b(software|saas|crm|erp|apis?|databases?|automation|automate|dashboards?|admin panels?|management systems?|booking systems?|business systems?|integrations?|connect (my |our )?(tools|systems)|digital transformation|inventory system|manual (work|process|data entry)|spreadsheets?|tracking orders?|track (orders|deliveries|inventory))\b/],
];
const industries: [string, RegExp][] = [
  ["restaurant", /\b(restaurants?|cafe|cafes|food business|takeaway)\b/],
  ["clothing", /\b(clothes|clothing|fashion|boutique|apparel)\b/],
  ["travel agency", /\b(travel agency|travel business|tour operator|tourism business)\b/],
  ["car rental", /\b(car rental|rental cars?|vehicle rental)\b/],
  ["hotel", /\b(hotels?|guest house|hospitality business)\b/],
  ["healthcare", /\b(clinic|healthcare|hospital|medical practice)\b/],
  ["education", /\b(school|academy|education|training business|teaching business)\b/],
  ["retail", /\b(shop|store|retail|sell products)\b/],
];
const featurePatterns: [string, RegExp][] = [
  ["online payments", /\b(payments?|checkout|pay online)\b/],
  ["user accounts", /\b(login|sign in|sign up|authentication|user accounts?)\b/],
  ["booking", /\b(bookings?|appointments?|reservations?)\b/],
  ["inventory management", /\b(inventory|stock|product management|categories)\b/],
  ["notifications", /\b(notifications?|reminders?|alerts?)\b/],
  ["online ordering", /\b(online ordering|online orders|place orders online)\b/],
  ["digital menu", /\bdigital menu\b/],
  ["delivery tracking", /\b(delivery tracking|track deliveries|track orders)\b/],
];
const offTopicRequest = /\b(recipes?|cook|cooking|dinner|car repair|repair (my |a )?car|engine (noise|oil|repair)|which car|car should i buy|place(s)? to (visit|eat|stay)|where (should|can) i (visit|eat|stay|travel)|travel recommendations?|recommend (a |some )?(restaurant|hotel|destination)|suggest (a |some )?(restaurant|hotel|place)|weather (today|tomorrow|forecast)|whats the weather|what is the weather|football|cricket|sports scores?|who (won|is the president)|politics|elections?|medical advice|medicine|treat (my|a)|symptoms?|relationship advice|dating advice|tell (me )?a joke|movies? to watch|capital of|solve \d|recipe for)\b/;
const businessPurpose = /\b(business|company|customers?|clients?|sell|selling|sales|run|running|start|starting|open|opening|launch|grow|manage|my shop|my store|our shop|our store)\b/;
const genericBusinessGoal = (text: string) => /\b(business|company|startup|agency|shop|store)\b/.test(text) && /\b(start|starting|open|opening|launch|run|running|grow|promote|manage|improve|customers?|sales)\b/.test(text);
const growthProblem = /\b(more customers|more clients|more sales|grow (my|our|the)|get customers|attract (customers|clients)|increase sales|not getting (customers|sales)|reach (customers|people)|promote (my|our))\b/;
const workflowProblem = /\b(manual (work|process|data entry)|spreadsheets?|paperwork|repetitive tasks|copying data|lose track|losing orders|missed (orders|bookings)|appointment conflicts|customers (call|phone|message).*orders?|manage (orders|bookings|inventory))\b/;
const projectAction = /\b(need|want|build|develop|create|design|make|looking for|help (me|us)|can you|could you|do you (offer|provide)|set up|setup|redesign|launch)\b/;
const digitalArtifact = /\b(websites?|apps?|applications?|software|saas|apis?|databases?|dashboards?|admin panels?|systems?|online stores?|ecommerce|digital|logo|branding|graphic|ui|ux|video editing|social media|seo|automation|automate|ai|artificial intelligence)\b/;

function analyseTurn(message: string, previous: ConversationContext): QuestionAnalysis {
  const original = normalizeQuestion(message);
  // Remove explicitly rejected requirements, rather than treating their words as requested services.
  const text = original.replace(/\b(?:i |we )?(?:dont|do not|no longer) (?:need|want)\b[^.;]*?(?=\bbut\b|\binstead\b|[.;]|$)/g, " ").trim();
  if (text !== original && previous.solution) previous = { ...previous, solution: undefined, platform: undefined, features: [] };
  if (/\b(start over|new project|another project|different project|forget (the |my )?(previous|last) project)\b/.test(text)) previous = { features: [] };
  const industry = industries.find(([, pattern]) => pattern.test(text))?.[0];
  const features = featurePatterns.filter(([, pattern]) => pattern.test(text)).map(([feature]) => feature);
  const platform = /\bandroid\b/.test(text) && /\b(ios|iphone)\b/.test(text) ? "Android and iOS" : /\bandroid\b/.test(text) ? "Android" : /\b(ios|iphone)\b/.test(text) ? "iOS" : undefined;
  const solution = solutionPatterns.find(([, pattern]) => pattern.test(text))?.[0];
  const unrelatedDeliverable = /\b(need|want|write|give me|suggest|recommend|make)\b[^.]{0,35}\b(recipes? for|medical advice|car repair advice|travel recommendations)\b/.test(text);
  const explicitDigital = digitalArtifact.test(text) && projectAction.test(text) && !unrelatedDeliverable;
  const educationalTech = /\b(what is|what are|explain|how does|how do|difference between)\b/.test(text) && /\b(api|database|saas|automation|ui|ux|software|web app)\b/.test(text);
  const context: ConversationContext = {
    solution: solution ?? previous.solution,
    industry: industry ?? previous.industry,
    platform: platform ?? (solution && solution !== "mobile" ? undefined : previous.platform),
    features: [...new Set([...previous.features, ...features])],
  };
  const result = (intent: QuestionIntent, score: number, evidence: string[], usedContext = false, resolved = context): QuestionAnalysis => ({
    intent, score, relevance: score >= 80 ? "highly-relevant" : score >= 40 ? "partially-relevant" : "irrelevant", context: resolved, usedContext, evidence,
  });
  const clear: ConversationContext = { features: [] };

  // Industry alone never overrides a request for cooking, travel, medical, or other unrelated advice.
  if (offTopicRequest.test(text) && !explicitDigital && !educationalTech) return result("unrelated", 8, ["Requested advice is outside digital services"], false, clear);
  if (/\b(ignore (your|all|previous|the) instructions|ignore (your|the) rules|act as|pretend to be)\b/.test(text) && !explicitDigital) return result("unrelated", 5, ["General-purpose role request"], false, clear);
  if (/^(hi|hello|hey|good morning|good evening)( there)?[.!]*$/.test(text)) return result("greeting", 80, ["Conversation greeting"]);
  if (/^(thanks|thank you|great|sounds good|ok|okay|yes|no|sure|both)[.!]*$/.test(text)) return result("acknowledgement", previous.solution ? 85 : 50, ["Conversation continuation"], Boolean(previous.solution), text === "both" && previous.solution === "mobile" ? { ...context, platform: "Android and iOS" } : context);

  if (/\b(cost|price|pricing|quote|budget|how much|timeline|how long|delivery time|launch date)\b/.test(text) && (explicitDigital || Boolean(solution) || Boolean(previous.solution) || /^(pricing|budget|quote|timeline)$/.test(text))) return result("estimate", 92, ["Project estimate or delivery discussion"], !solution && Boolean(previous.solution));
  if (educationalTech || /\b(tech(nology)? stack|which technologies|what technologies|which frameworks|programming languages|frameworks?|laravel|django|angular|flutter|rust|wordpress|shopify)\b/.test(text)) return result("technology", 94, ["Technology explanation or stack question"]);
  if (/\b(ai|artificial intelligence|machine learning|chatbot)\b/.test(text)) return result("ai", 90, ["Digital automation requirement; scope review needed"]);
  if (solution) {
    // A business-growth question calls for marketing guidance, even if an online shop is mentioned.
    if (growthProblem.test(text)) return result("marketing", explicitDigital ? 94 : 65, ["Customer acquisition goal"], false, { ...context, solution: "marketing" });
    if (workflowProblem.test(text) && !explicitDigital) return result("software", 68, ["Business workflow that could benefit from software"], false, { ...context, solution: "software" });
    return result(solution, explicitDigital ? 97 : 90, ["Identified digital service or workflow need"]);
  }
  if (/\b(what can you (develop|build|create)|what do you do|what (services|solutions)|our services|your services|available services|digital solutions|technology solutions)\b/.test(text) || text === "services") return result("services", 98, ["Company capabilities question"]);

  // Only bounded follow-ups inherit an active project. Random questions cannot borrow its relevance.
  const followUp = Boolean(previous.solution) && (
    Boolean(industry) || features.length > 0 || /\b(for my business|for our business|for my company|for our company|small business|existing (site|product)|already have|first release|launch in|within \d|in \d (weeks|months)|budget is|around \d|\d pages?|\d users?)\b/.test(text)
  );
  if (followUp) return result(previous.solution!, 91, ["Requirement refines the active project"], true);
  if (workflowProblem.test(text)) return result("software", 66, ["Business workflow that could benefit from software"], false, { ...context, solution: "software" });
  if (features.length) return result("clarify", 84, ["Digital product features without a selected platform"]);
  if ((industry && businessPurpose.test(text)) || genericBusinessGoal(text) || growthProblem.test(text) || /\b(my business|our business|start a business|grow a business|improve my business|business is struggling)\b/.test(text)) {
    const suggested = growthProblem.test(text) ? "marketing" : industry === "clothing" || industry === "retail" ? "ecommerce" : "web";
    return result(suggested, 65, ["Business goal with a plausible digital solution"], false, { ...context, solution: suggested });
  }
  if (/\b(project idea|start a project|digital product|technology|tech|solynext|digital transformation|custom solution)\b/.test(text)) return result("project", 88, ["Digital project discovery"]);
  if (/\b(can you help|need help|something for my business|i have an idea|make something|build something|design something)\b/.test(text)) return result("clarify", 45, ["Unclear goal; ask before selecting a service"]);
  return result("unrelated", 15, ["No meaningful service or project connection"], false, clear);
}

/** Local intent/frame analysis. Scores are routing heuristics, not model probabilities. */
export function analyzeQuestion(message: string, history: ChatMessage[] = []): QuestionAnalysis {
  let previous: ConversationContext = { features: [] };
  const turns = history.filter(item => item.role === "user");
  // The UI request includes the current user message as the final history item.
  if (turns.length && normalizeQuestion(turns[turns.length - 1].text) === normalizeQuestion(message)) turns.pop();
  for (const turn of turns.slice(-24)) {
    const analysis = analyseTurn(turn.text, previous);
    if (analysis.intent === "unrelated") previous = { features: [] };
    else previous = analysis.context;
  }
  return analyseTurn(message, previous);
}
