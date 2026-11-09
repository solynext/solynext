import type { CatalogApp } from "./model";

const demo = (id: string, name: string, category: string, description: string, details: string, image: string, order: number, platforms: string[] = []): CatalogApp => ({
  id, name, category, description, details, image, order, platforms,
  url: `/app-demos/${id}.html`, developer: "SolyNext Demo", version: "Preview",
  status: "Published", featured: order === 0, updatedAt: "2026-01-01T00:00:00.000Z",
  purpose: description, currentStatus: "Concept preview", owner: "SolyNext", ownerType: "Sample product", agency: "SolyNext", developmentTeam: "Product design · Web development · Quality review", audience: "Small teams and independent businesses", features: ["Clear, focused workspace", "Responsive layouts", "Simple status overview"], releaseDate: "Preview",
});

/** Seed previews for development and first visits. A managed catalog takes precedence once published. */
export const demoApps: CatalogApp[] = [
  demo("10000000-0000-4000-8000-000000000001", "Invoice Desk", "Business", "Create invoices, track payments, and follow up on overdue accounts.", "A lightweight billing workspace for small teams. Draft invoices, review payment status, and keep client balances in one place. This sample screen is for demonstration only; it does not save or send invoices.", "/images/appstore-business.jpg", 0),
  demo("10000000-0000-4000-8000-000000000002", "Stock Keeper", "Business", "Track products, stock levels, and low inventory in one dashboard.", "A simple inventory overview with product search, stock alerts, and recent changes. This sample screen uses illustrative data only.", "/images/appstore-business.jpg", 1),
  demo("10000000-0000-4000-8000-000000000003", "Shop Builder", "Websites", "Preview a clean storefront and manage a small product catalog.", "Explore a sample online shop with featured products, collections, and a compact storefront dashboard. No orders or customer details are collected.", "/images/appstore-website.jpg", 0),
  demo("10000000-0000-4000-8000-000000000004", "Site Planner", "Websites", "Organize pages, content, and launch tasks for a new website.", "A sample project board for planning a website launch, with page ideas, content status, and next steps.", "/images/appstore-website.jpg", 1),
  demo("10000000-0000-4000-8000-000000000005", "Trip Journal", "Lifestyle", "Save places to visit and sketch out a simple travel plan.", "A visual travel planner with saved destinations, day-by-day notes, and a shortlist of places to explore.", "/images/appstore-inspiration.jpg", 2),
  demo("20000000-0000-4000-8000-000000000001", "Focus Blocks", "Games", "A calm mini game: sort the falling blocks and beat your best score.", "A small keyboard-friendly puzzle preview. Use the arrow keys to move and rotate blocks. Scores are local to this demo and are not saved.", "/images/appstore-inspiration.jpg", 0),
  demo("20000000-0000-4000-8000-000000000002", "Color Match", "Games", "Match the color tiles in as few moves as you can.", "A quick sample puzzle for a short break. Tap a color to fill the board and try to bring every tile together.", "/images/appstore-website.jpg", 1),
  demo("30000000-0000-4000-8000-000000000001", "Budget Starter", "Downloads", "A starter budget workbook for monthly income and expenses.", "Downloadable planning template. The sample listing is illustrative and does not contain financial advice.", "/images/appstore-business.jpg", 0, ["Windows", "macOS", "Linux", "Other"]),
  demo("30000000-0000-4000-8000-000000000002", "Icon Pack", "Downloads", "A small set of interface icons for mockups and prototypes.", "Downloadable design resource for sample screens and prototypes.", "/images/appstore-inspiration.jpg", 1, ["Windows", "macOS", "iOS", "Android", "Other"]),
];
