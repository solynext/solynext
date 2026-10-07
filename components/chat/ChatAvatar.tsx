import styles from "./TechSolutionsChatbot.module.css";

/** Small, self-contained illustrations; no third-party portrait requests. */
export function ChatAvatar({ role, large = false }: { role: "assistant" | "user"; large?: boolean }) {
  const female = role === "assistant";
  return <span className={`${styles.avatar} ${female ? styles.femaleAvatar : styles.maleAvatar} ${large ? styles.headerAvatar : ""}`} role="img" aria-label={female ? "Female assistant avatar" : "Male user avatar"}>
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill={female ? "#f0ddec" : "#e0eaf7"}/>
      {female ? <path d="M10 19c0-9 4-13 10-13s10 5 10 13v14H10V19Z" fill="#493145"/> : <path d="M11 16c0-7 4-11 9-11 6 0 10 4 10 11l-2 9H13l-2-9Z" fill="#35354c"/>}
      <path d="M5 40c1-8 6-12 15-12s14 4 15 12H5Z" fill={female ? "#94365e" : "#5879a8"}/>
      <path d="M16 25h8v6l-4 4-4-4v-6Z" fill="#dba888"/>
      <ellipse cx="20" cy="19" rx="7.5" ry="9" fill="#efc2a0"/>
      {female ? <path d="M12 17c0-6 3-9 8-9 5 0 8 3 8 8-4-1-7-3-9-6-1 3-4 6-7 7Z" fill="#493145"/> : <path d="M12 16c0-6 3-8 8-8 4 0 8 3 8 7-5 0-7-3-8-4-2 3-5 4-8 5Z" fill="#35354c"/>}
      <circle cx="17" cy="19" r=".8" fill="#4d3540"/><circle cx="23" cy="19" r=".8" fill="#4d3540"/>
      <path d="M17.5 23c1.5 1.5 3.5 1.5 5 0" stroke="#ac6b66" strokeWidth="1" strokeLinecap="round"/>
      <path d="m14 30 6 5 6-5" stroke={female ? "#c888a8" : "#9fb7d9"} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  </span>;
}
