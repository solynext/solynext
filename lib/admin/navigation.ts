import { LayoutDashboard, FolderKanban, Layers3, Braces, Building2, Star, Users, Image, Inbox, PanelsTopLeft, Settings, UserRound, ListTodo, ChartNoAxesCombined, Handshake, Bell, Activity, UserCog } from "lucide-react";

/** Only primary destinations appear in the sidebar. Related tools stay in pages. */
export const adminNavigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Website", href: "/admin/content", icon: PanelsTopLeft },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const adminPageNavigation = [
  { label: "Project management", parent: "/admin/projects", items: [
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Tasks", href: "/admin/tasks", icon: ListTodo },
    { label: "Delivery", href: "/admin/work-progress", icon: ChartNoAxesCombined },
  ] },
  { label: "Team management", parent: "/admin/team", items: [
    { label: "Members", href: "/admin/team", icon: Users },
    { label: "Responsibilities", href: "/admin/roles", icon: UserCog },
  ] },
  { label: "Website management", parent: "/admin/content", items: [
    { label: "Content & insights", href: "/admin/content", icon: PanelsTopLeft },
    { label: "Services", href: "/admin/services", icon: Layers3 },
    { label: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
    { label: "Media", href: "/admin/media", icon: Image },
    { label: "Technologies", href: "/admin/technologies", icon: Braces },
    { label: "Partners", href: "/admin/partners", icon: Handshake },
  ] },
  { label: "Workspace administration", parent: "/admin/settings", items: [
    { label: "Preferences", href: "/admin/settings", icon: Settings },
    { label: "Activity", href: "/admin/activity", icon: Activity },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "My profile", href: "/admin/profile", icon: UserRound },
  ] },
];

export const adminSearchNavigation = [
  ...adminNavigation,
  ...adminPageNavigation.flatMap(group => group.items).filter(item => !adminNavigation.some(main => main.href === item.href)),
].map(item => ({
  ...item,
  keywords: adminPageNavigation.flatMap(group => group.items).filter(link => link.href === item.href).map(link => link.label).join(" "),
}));

export function isAdminRouteActive(pathname: string, href: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"));
}

export function getAdminPageNavigation(pathname: string) {
  return adminPageNavigation.find(group => group.items.some(item => isAdminRouteActive(pathname, item.href)));
}
