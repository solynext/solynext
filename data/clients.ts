/** Shared client identities used by public content, admin seeds, and local storage. */
export const CLIENTS = [
  { id: "c1", name: "Al Madina Traders", category: "Wholesale & Retail", slug: "al-madina-traders", icon: "Store", summary: "Wholesale orders, stock, and retail sales in one place.", image: "/images/cloud-infrastructure.jpg" },
  { id: "c2", name: "Noor Boutique", category: "Fashion & Clothing", slug: "noor-boutique", icon: "Shirt", summary: "A fashion storefront with simple browsing and ordering.", image: "/images/uiux-design.jpg" },
  { id: "c3", name: "Pak Auto Parts", category: "Automotive", slug: "pak-auto-parts", icon: "Wrench", summary: "A searchable parts catalog with stock and order management.", image: "/images/engineering-dev.jpg" },
  { id: "c4", name: "Fresh Basket", category: "Grocery & Mart", slug: "fresh-basket", icon: "ShoppingBasket", summary: "Grocery shopping, inventory, and delivery orders made simple.", image: "/images/marketing-growth.jpg" },
  { id: "c5", name: "Urban Chai", category: "Café & Restaurant", slug: "urban-chai", icon: "Coffee", summary: "A digital menu and ordering experience for café guests.", image: "/images/hero-tech.jpg" },
  { id: "c6", name: "Prime Property Hub", category: "Real Estate", slug: "prime-property-hub", icon: "Building2", summary: "Property listings and inquiries in one workspace.", image: "/images/fintech-enterprise.jpg" },
] as const;

export const CLIENT_CATEGORIES = CLIENTS.map(client => client.category);
