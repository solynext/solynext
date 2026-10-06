import { Activity, BookOpen, Cloud, Code2, Database, Fingerprint, Flag, Globe2, GraduationCap, House, Layers3, Monitor, PenTool, RefreshCw, Rocket, ShieldCheck, ShoppingBag, Smartphone, TrendingUp, Truck, Users, Zap } from "lucide-react";

function cardIdentity(kind: string) {
  const text = kind.toLowerCase();
  if (/health|care|medical/.test(text)) return { tone: "cyan", shape: "orbit", icon: Activity };
  if (/fintech|financ|security|standard|trust/.test(text)) return { tone: "green", shape: "shield", icon: ShieldCheck };
  if (/design|creative|figma/.test(text)) return { tone: "pink", shape: "orbit", icon: PenTool };
  if (/brand|identity/.test(text)) return { tone: "pink", shape: "orbit", icon: Fingerprint };
  if (/market|growth|business|value|compensation/.test(text)) return { tone: "amber", shape: "chart", icon: TrendingUp };
  if (/commerce|shop/.test(text)) return { tone: "amber", shape: "stack", icon: ShoppingBag };
  if (/real estate|house/.test(text)) return { tone: "green", shape: "stack", icon: House };
  if (/logistic|truck/.test(text)) return { tone: "blue", shape: "route", icon: Truck };
  if (/mobile|android|ios|react native/.test(text)) return { tone: "cyan", shape: "orbit", icon: Smartphone };
  if (/cloud|devops|docker/.test(text)) return { tone: "purple", shape: "orbit", icon: Cloud };
  if (/database|postgres|redis|data/.test(text)) return { tone: "purple", shape: "stack", icon: Database };
  if (/document|book|learning|stipend/.test(text)) return { tone: "purple", shape: "stack", icon: GraduationCap };
  if (/launch|deployment/.test(text)) return { tone: "cyan", shape: "route", icon: Rocket };
  if (/team|dedicated|collaborat|global|remote|director/.test(text)) return { tone: "purple", shape: "orbit", icon: Users };
  if (/retainer|support|evolution/.test(text)) return { tone: "green", shape: "orbit", icon: RefreshCw };
  if (/milestone|discovery|research/.test(text)) return { tone: "blue", shape: "route", icon: Flag };
  if (/hardware/.test(text)) return { tone: "blue", shape: "stack", icon: Monitor };
  if (/software|backend|architect|saas/.test(text)) return { tone: "purple", shape: "stack", icon: Layers3 };
  if (/article|insight/.test(text)) return { tone: "pink", shape: "stack", icon: BookOpen };
  if (/energy/.test(text)) return { tone: "amber", shape: "route", icon: Zap };
  if (/world|international/.test(text)) return { tone: "cyan", shape: "orbit", icon: Globe2 };
  return { tone: "blue", shape: "stack", icon: Code2 };
}

export function cardTone(kind: string) {
  return cardIdentity(kind).tone;
}

/** Decorative, code-native artwork shared by marketing cards on every route. */
export function CardMotif({ kind }: { kind: string }) {
  const { icon: Icon, shape } = cardIdentity(kind);
  return <div className={`card-motif motif-${shape}`} aria-hidden="true">
    <span className="motif-dots" />
    <svg className="motif-lines" viewBox="0 0 240 110" fill="none">
      {shape === "orbit" ? <><ellipse cx="151" cy="53" rx="76" ry="33" transform="rotate(-25 151 53)"/><ellipse cx="151" cy="53" rx="45" ry="46" transform="rotate(25 151 53)"/></> : shape === "chart" ? <><path d="M84 91H225M95 91V70H118V91M129 91V48H152V91M163 91V25H186V91M197 91V8H220V91"/><path d="M86 65L128 38L162 43L209 11M197 11H209V23"/></> : shape === "route" ? <><path d="M52 87H120Q139 87 139 68V37Q139 18 158 18H216"/><circle cx="52" cy="87" r="7"/><circle cx="216" cy="18" r="7"/><path d="M67 26H100M67 36H90M175 78H216"/></> : shape === "shield" ? <><path d="M153 8L207 28V58Q207 88 153 104Q99 88 99 58V28Z"/><path d="M129 56L145 72L180 38"/></> : <><path d="M77 40L151 9L225 40L151 71Z"/><path d="M77 57L151 88L225 57M77 74L151 105L225 74"/></>}
    </svg>
    <span className="motif-glass"/><span className="motif-tile"><Icon size={37} strokeWidth={1.8}/></span><span className="motif-spark"><Layers3 size={17}/></span>
  </div>;
}
