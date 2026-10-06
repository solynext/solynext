import Link from "next/link";
import { ArrowRight, Code2, Layers3, Smartphone, PenTool } from "lucide-react";
import { SERVICES_DATA } from "@/data/mockData";
import styles from "./ServiceCards.module.css";

const cards = [
  { icon: Code2, lead: "Web", accent: "applications", theme: "web", tags: ["Next.js", "React", "APIs"], more: "+3 more" },
  { icon: Layers3, lead: "Custom", accent: "software", theme: "software", tags: ["Node.js", "Python", "Databases"], more: "+3 more" },
  { icon: Smartphone, lead: "Mobile", accent: "applications", theme: "mobile", tags: ["React Native", "Android", "iOS"], more: "+3 more" },
  { icon: PenTool, lead: "UI/UX &", accent: "product design", theme: "design", tags: ["Figma", "Design Systems", "Prototyping"], more: "+2 more" },
];

function Illustration({ theme }: { theme: string }) {
  const id = `service-art-${theme}`;
  return <svg className={styles.illustration} viewBox="0 0 240 280" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={theme === "software" || theme === "design" ? "#8561ef" : "#526ce0"}/><stop offset="1" stopColor="#111d63"/></linearGradient>
      <linearGradient id={`${id}-bright`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor={theme === "design" ? "#fba5db" : theme === "software" ? "#c09bff" : "#56e3ff"}/><stop offset="1" stopColor={theme === "design" ? "#c744e9" : theme === "software" ? "#7435f5" : "#0060ff"}/></linearGradient>
      <linearGradient id={`${id}-edge`}><stop stopColor="#e7dbff"/><stop offset=".5" stopColor="#b6b4ff"/><stop offset="1" stopColor="#6483fc"/></linearGradient>
      <filter id={`${id}-shadow`} x="-50%" y="-40%" width="200%" height="200%"><feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#343491" floodOpacity=".25"/></filter>
    </defs>
    <ellipse cx="143" cy="238" rx="82" ry="19" fill="var(--card-accent)" opacity=".16"/>
    <circle cx="148" cy="146" r="100" fill="white" opacity=".2"/>
    <rect x="61" y="50" width="134" height="159" rx="24" stroke="white" opacity=".4" transform="rotate(10 128 130)"/>
    <g filter={`url(#${id}-shadow)`}>
      {theme === "web" && <>
        <g transform="translate(63 78) rotate(10)"><rect width="145" height="111" rx="10" fill={`url(#${id}-edge)`}/><rect x="5" y="5" width="135" height="101" rx="7" fill={`url(#${id}-panel)`}/><path d="M-26 115H147L172 143H-45Z" fill={`url(#${id}-edge)`}/><path d="M-14 119H137L151 132H-25Z" fill="#626cba"/><path d="M38 135H89L97 140H32Z" fill="#d5ddff"/>{[0,1,2,3,4,5].map(n=><g key={n}><circle cx="17" cy={23+n*12} r="2" fill="#a9a2ff"/><rect x="26" y={20+n*12} width={[33,63,44,30,58,39][n]} height="4" rx="2" fill={n%2 ? "#b28cff" : "#51d8ff"}/></g>)}</g>
        <g transform="translate(145 26) rotate(10)"><rect width="77" height="56" rx="9" fill={`url(#${id}-bright)`} stroke="#78b8ff" strokeWidth="2"/><circle cx="39" cy="29" r="14" stroke="white" strokeWidth="2.5"/><ellipse cx="39" cy="29" rx="6" ry="14" stroke="white" strokeWidth="2"/><path d="M25 29H53M28 22H50M28 36H50" stroke="white" strokeWidth="2"/></g>
        <g transform="translate(138 152) rotate(10)"><rect width="67" height="59" rx="11" fill={`url(#${id}-bright)`} stroke="#83beff" strokeWidth="2"/><path d="M25 20L15 30L25 40M43 20L53 30L43 40M38 16L30 44" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g>
      </>}
      {theme === "software" && <>
        <g transform="translate(80 27) rotate(6)"><rect width="142" height="155" rx="12" fill={`url(#${id}-edge)`}/><rect x="5" y="5" width="132" height="145" rx="9" fill={`url(#${id}-panel)`}/>{[0,1,2,3,4].map(n=><g key={n}><circle cx="19" cy={25+n*20} r="3.5" fill="#d487fc"/><rect x="31" y={22+n*20} width={[52,70,28,47,61][n]} height="5" rx="2.5" fill="#dca0ff"/></g>)}<circle cx="112" cy="24" r="4" fill="#a272ef"/><circle cx="122" cy="24" r="4" fill="#a272ef"/></g>
        <g transform="translate(136 108) rotate(8)">{[0,1,2].map(n=><g key={n}><rect y={n*28} width="64" height="25" rx="6" fill={`url(#${id}-bright)`} stroke="#c9a2ff"/><rect x="10" y={10+n*28} width="26" height="4" rx="2" fill="#e9d5ff"/><circle cx="51" cy={12+n*28} r="2" fill="white"/></g>)}</g>
        <g transform="translate(62 120) rotate(8)"><rect width="67" height="65" rx="12" fill={`url(#${id}-bright)`} stroke="#d1b5ff" strokeWidth="2"/><path d="M18 43C7 41 10 27 20 27C19 12 41 12 43 27C56 24 61 44 48 45Z" fill="white"/></g>
        <g transform="translate(156 169) rotate(10)"><rect width="66" height="65" rx="12" fill={`url(#${id}-panel)`} stroke="#ae97f5" strokeWidth="2"/><text x="33" y="46" textAnchor="middle" fill="white" fontSize="43">⚙</text></g>
      </>}
      {theme === "mobile" && <>
        <g transform="translate(98 15) rotate(9)"><rect width="117" height="226" rx="22" fill={`url(#${id}-edge)`}/><rect x="4" y="3" width="108" height="219" rx="19" fill="#172555"/><rect x="9" y="9" width="98" height="207" rx="15" fill={`url(#${id}-bright)`}/><path d="M32 8H84L79 21H38Z" fill="#172555"/><rect x="48" y="12" width="20" height="3" rx="2" fill="#697598"/><path d="M60 78C47 67 31 81 36 99C40 119 49 128 59 121C69 129 80 117 85 103C75 100 71 85 82 78C75 69 66 72 60 78Z" fill="white"/><path d="M59 73C58 63 68 56 74 56C75 65 68 74 59 73Z" fill="white"/></g>
        <g transform="translate(53 123) rotate(10)"><rect width="64" height="65" rx="11" fill="#31e773" stroke="#9bffb3" strokeWidth="2"/><g stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 28H44V44H20ZM22 25C22 13 42 13 42 25M23 16L19 11M41 16L45 11M26 44V51M38 44V51M15 28V40M49 28V40"/></g><circle cx="27" cy="22" r="1.5" fill="#31e773"/><circle cx="37" cy="22" r="1.5" fill="#31e773"/></g>
        <g transform="translate(108 181) rotate(9)"><rect width="61" height="58" rx="11" fill={`url(#${id}-bright)`} stroke="#8bd5ff" strokeWidth="2"/><path d="M23 20L14 29L23 38M40 20L49 29L40 38M36 16L28 42" stroke="white" strokeWidth="3.5" strokeLinecap="round"/></g>
        <g transform="translate(181 148) rotate(9)"><rect width="47" height="48" rx="9" fill={`url(#${id}-panel)`} stroke="#a7c6f1"/><text x="24" y="35" textAnchor="middle" fill="white" fontSize="33">⚙</text></g>
      </>}
      {theme === "design" && <>
        <g transform="translate(64 50) rotate(7)"><rect width="147" height="161" rx="12" fill={`url(#${id}-panel)`} stroke="#b187ee" strokeWidth="2"/><path d="M0 26H147" stroke="#aaa0ff"/><circle cx="13" cy="14" r="3" fill="#ffabe0"/><circle cx="24" cy="14" r="3" fill="#cd9bff"/><circle cx="35" cy="14" r="3" fill="#8a9dff"/><rect x="14" y="39" width="53" height="101" rx="6" fill="#f2ddff"/><rect x="21" y="48" width="38" height="14" rx="4" fill="#ffa5c9"/><rect x="21" y="72" width="29" height="5" rx="2" fill="#cbadf3"/><rect x="21" y="84" width="37" height="5" rx="2" fill="#cbadf3"/><rect x="21" y="98" width="38" height="31" rx="4" fill={`url(#${id}-bright)`}/><path d="M25 122L35 106L43 116L49 111L57 122Z" fill="white"/><rect x="82" y="106" width="46" height="5" rx="2" fill="#71c8ff"/><rect x="82" y="119" width="36" height="5" rx="2" fill="#8c99ef"/><rect x="82" y="132" width="44" height="5" rx="2" fill="#8c99ef"/></g>
        <g transform="translate(149 17) rotate(7)"><rect width="67" height="72" rx="11" fill={`url(#${id}-panel)`} stroke="#8e88cd"/><rect x="18" y="13" width="17" height="17" rx="8" fill="#ff786b"/><rect x="33" y="13" width="17" height="17" rx="8" fill="#ffaa88"/><rect x="18" y="29" width="17" height="17" rx="8" fill="#b276ff"/><circle cx="42" cy="37" r="8" fill="#2acaff"/><rect x="18" y="45" width="17" height="17" rx="8" fill="#37efae"/></g>
        <g transform="translate(146 105) rotate(7)"><rect width="65" height="60" rx="10" fill={`url(#${id}-panel)`} stroke="#a49af0"/><text x="32" y="41" textAnchor="middle" fill="white" fontSize="33" fontWeight="600">Aa</text></g>
        <path d="M178 179L186 237L198 222L213 239L224 228L208 212L229 208Z" fill="#f9f4ff" stroke="#c2aff5" strokeWidth="3" strokeLinejoin="round"/>
      </>}
    </g>
  </svg>;
}

export function ServiceCards() {
  return <div className={styles.grid}>{cards.map((card, index) => {
    const Icon = card.icon;
    const service = SERVICES_DATA[index];
    return <Link href={`/services/${service.slug}`} className={`${styles.card} ${styles[card.theme]}`} key={service.id}>
      <svg className={styles.waves} viewBox="0 0 460 460" preserveAspectRatio="none" aria-hidden="true"><path d="M460 0C350-20 324 135 262 221S338 365 460 315Z" fill="var(--card-accent)" opacity=".3"/><path d="M460 100C320 39 246 120 263 224S345 362 460 352Z" fill="var(--card-accent)" opacity=".1"/><path d="M460 270C389 377 359 366 300 400S240 460 144 460H460Z" fill="var(--card-accent)" opacity=".25"/><path d="M150 460C262 448 275 348 365 399S437 456 460 460" fill="var(--card-accent)" opacity=".23"/><path d="M280 426C363 335 411 384 460 349" stroke="white" opacity=".6"/></svg>
      <span className={styles.dots} aria-hidden="true"/>
      <div className={styles.top}><span className={styles.icon}><Icon size={38} strokeWidth={2.2}/></span><span className={styles.category}>{index === 3 ? "Design" : "Engineering"}</span></div>
      <Illustration theme={card.theme}/>
      <div className={styles.copy}><h3>{card.lead} <span>{card.accent}</span></h3><p>{service.shortDescription}</p></div>
      <div className={styles.tags}>{card.tags.map(tag => <span key={tag}>{tag}</span>)}<span className={styles.more}>{card.more}</span></div>
      <span className={styles.link}>View Details <ArrowRight size={22}/><i aria-hidden="true"/></span>
    </Link>;
  })}</div>;
}
