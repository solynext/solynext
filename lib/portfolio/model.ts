import type { CaseStudy } from "@/types";

export interface ProjectImage { src: string; alt: string }
export interface PortfolioProject extends CaseStudy {
  status: "Published" | "Draft" | "Archived";
  featured: boolean;
  displayOrder: number;
  imageAlt: string;
  projectUrl: string;
  gallery: ProjectImage[];
  completionDate: string;
  projectId: string;
  updatedAt: string;
}
export type PublicProject = Omit<PortfolioProject, "status" | "projectId" | "updatedAt">;
export type ProjectInput = Omit<PortfolioProject, "id" | "updatedAt">;

function text(value: unknown, label: string, max: number, required = false): string {
  if (typeof value !== "string" || value.trim().length > max || (required && !value.trim())) throw new Error(`${label}: ${required ? "enter a value" : "use text"} up to ${max} characters.`);
  return value.trim();
}
export function projectLink(value: unknown): string {
  const href = text(value, "Project link", 1000);
  if (!href) return "";
  try { const url = new URL(href); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); }
  catch { throw new Error("Project link: use an HTTPS URL."); }
  return href;
}
export function projectImage(value: unknown): string {
  const src = text(value, "Image", 1000, true);
  if (/^\/images\/[a-zA-Z0-9_./-]+\.(png|jpe?g|webp)$/i.test(src) && !src.includes("..")) return src;
  if (/^\/api\/project-images\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(src)) return src;
  if (src.startsWith("https://")) return projectLink(src);
  throw new Error("Image: upload a PNG, JPEG or WebP, choose a site image, or use an HTTPS image URL.");
}
function list(value: unknown, label: string, max: number): string[] {
  if (!Array.isArray(value) || value.length > max) throw new Error(`${label}: use at most ${max} items.`);
  return [...new Set(value.map(item => text(item, label, 500, true)))];
}
export function validateProject(value: unknown): ProjectInput {
  if (!value || typeof value !== "object") throw new Error("Project: enter project details.");
  const input = value as Record<string, unknown>;
  const slug = text(input.slug, "URL slug", 100, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("URL slug: use lowercase letters, numbers and single hyphens.");
  if (!["Published", "Draft", "Archived"].includes(String(input.status))) throw new Error("Status: choose Published, Draft or Archived.");
  if (typeof input.featured !== "boolean" || !Number.isInteger(input.displayOrder) || Number(input.displayOrder) < 0 || Number(input.displayOrder) > 9999) throw new Error("Display order: use a whole number from 0 to 9999.");
  if (!Array.isArray(input.keyResults) || input.keyResults.length > 12) throw new Error("Results: use at most 12 results.");
  const keyResults = input.keyResults.map(item => ({ metric: text(item?.metric, "Result metric", 80, true), label: text(item?.label, "Result label", 160, true) }));
  if (!Array.isArray(input.gallery) || input.gallery.length > 12) throw new Error("Gallery: use at most 12 images.");
  const gallery = input.gallery.map(item => ({ src: projectImage(item?.src), alt: text(item?.alt, "Gallery image description", 180, true) }));
  const completionDate = text(input.completionDate, "Completion date", 10);
  if (completionDate && (!/^\d{4}-\d{2}-\d{2}$/.test(completionDate) || Number.isNaN(Date.parse(completionDate)) || new Date(completionDate).toISOString().slice(0, 10) !== completionDate)) throw new Error("Completion date: enter a valid date.");
  let testimonial: CaseStudy["testimonial"];
  if (input.testimonial != null) {
    const entry = input.testimonial as Record<string, unknown>;
    testimonial = { quote: text(entry.quote, "Testimonial quote", 2000, true), author: text(entry.author, "Testimonial author", 120, true), role: text(entry.role, "Testimonial role", 120), company: text(entry.company, "Testimonial company", 180) };
  }
  return {
    title: text(input.title, "Title", 180, true), slug, client: text(input.client, "Client", 180), clientLocation: text(input.clientLocation, "Client location", 180), industry: text(input.industry, "Industry", 120, true), summary: text(input.summary, "Summary", 2000, true), challenge: text(input.challenge, "Challenge", 5000), solution: text(input.solution, "Solution", 5000), featuredImage: projectImage(input.featuredImage), imageAlt: text(input.imageAlt, "Cover image description", 180, true), projectUrl: projectLink(input.projectUrl), keyResults, technologies: list(input.technologies, "Technologies", 40), architectureDetails: list(input.architectureDetails, "Engineering highlights", 30), testimonial, gallery, completionDate, projectId: text(input.projectId, "Delivery project", 100), status: input.status as ProjectInput["status"], featured: input.featured, displayOrder: Number(input.displayOrder),
  };
}
export function publicProjects(items: PortfolioProject[]): PublicProject[] {
  return items.filter(item => item.status === "Published").sort((a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title)).map(item => {
    const { status, projectId, updatedAt, ...publicItem } = item;
    void status; void projectId; void updatedAt;
    return publicItem;
  });
}

export function upsertProject(items: PortfolioProject[], id: string | null, value: ProjectInput): PortfolioProject[] {
  const input = validateProject(value);
  if (id && !items.some(item => item.id === id)) throw new Error("Project: this record was removed. Refresh the list.");
  if (items.some(item => item.slug === input.slug && item.id !== id)) throw new Error("URL slug: another project already uses this slug.");
  if (!id && items.length >= 200) throw new Error("Project: the portfolio limit is 200 projects.");
  const project = { ...input, id: id ?? crypto.randomUUID(), updatedAt: new Date().toISOString() };
  return id ? items.map(item => item.id === id ? project : item) : [project, ...items];
}
