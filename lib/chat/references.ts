/** Public, approved documentation links; they are references, not a live browsing tool. */
export const technicalReferences = [
  { label: "React documentation", href: "https://react.dev/learn" },
  { label: "Next.js documentation", href: "https://nextjs.org/docs" },
  { label: "JavaScript documentation", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { label: "TypeScript documentation", href: "https://www.typescriptlang.org/docs/" },
  { label: "Python documentation", href: "https://docs.python.org/3/" },
  { label: "Node.js documentation", href: "https://nodejs.org/en/learn" },
  { label: "Django documentation", href: "https://docs.djangoproject.com/" },
  { label: "Laravel documentation", href: "https://laravel.com/docs" },
  { label: "PostgreSQL documentation", href: "https://www.postgresql.org/docs/" },
  { label: "Docker documentation", href: "https://docs.docker.com/" },
  { label: "Vercel deployment documentation", href: "https://vercel.com/docs/deployments" },
  { label: "Figma help", href: "https://help.figma.com/" },
  { label: "Web accessibility guidance", href: "https://www.w3.org/WAI/" },
  { label: "Google SEO guidance", href: "https://developers.google.com/search/docs" },
];

const publicPages = new Set(["/", "/about", "/contact", "/services", "/pricing", "/process", "/portfolio", "/technologies", "/solutions", "/blog", "/careers", "/privacy-policy"]);
export function isPublicChatLink(href: string) {
  return publicPages.has(href) || /^\/(?:services|portfolio|blog)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(href) || technicalReferences.some(reference => reference.href === href);
}
