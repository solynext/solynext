export interface WebsiteNotification {
  id: string;
  title: string;
  message: string;
  href: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface NotificationInput {
  title: string;
  message: string;
  href: string;
  status: "draft" | "published";
}

export type PublicNotification = Pick<WebsiteNotification, "id" | "title" | "message" | "href" | "updatedAt" | "publishedAt">;

export function validateNotification(value: unknown): NotificationInput {
  if (!value || typeof value !== "object") throw new Error("Enter notification details.");
  const input = value as Record<string, unknown>;
  if (typeof input.title !== "string" || !input.title.trim() || input.title.trim().length > 120) throw new Error("Enter a title of 1–120 characters.");
  if (typeof input.message !== "string" || !input.message.trim() || input.message.trim().length > 2000) throw new Error("Enter a message of 1–2,000 characters.");
  if (input.status !== "draft" && input.status !== "published") throw new Error("Choose draft or published.");
  if (typeof input.href !== "string" || input.href.length > 500) throw new Error("Enter a valid link.");
  const href = input.href.trim();
  if (href) {
    const url = new URL(href, "https://solynext.local");
    if (url.protocol !== "https:" || url.username || url.password || href.includes("\\") || /[\u0000-\u0020]/.test(href) || (!href.startsWith("https://") && (!href.startsWith("/") || href.startsWith("//"))) || (url.origin === "https://solynext.local" && /^\/(admin|api)(\/|$)/.test(url.pathname))) throw new Error("Use a public website path or an HTTPS link.");
  }
  return { title: input.title.trim(), message: input.message.trim(), href, status: input.status };
}

export function publishedNotifications(items: WebsiteNotification[]): PublicNotification[] {
  return items.filter(item => item.status === "published").sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")).map(({ id, title, message, href, updatedAt, publishedAt }) => ({ id, title, message, href, updatedAt, publishedAt }));
}
