import type { AdminActivity, AdminNotification } from "@/lib/admin/types";
export const initialActivity: AdminActivity[] = [
  { id: "a1", title: "Client delivery review scheduled", detail: "FinEdge · Development milestone", time: "Today, 11:30 AM", kind: "Projects", href: "/admin/projects" },
  { id: "a2", title: "New inquiry received", detail: "Emma Wilson · Customer portal", time: "Today, 10:45 AM", kind: "Inquiries", href: "/admin/inquiries" },
  { id: "a3", title: "Accessibility audit completed", detail: "Quality assurance · Client acceptance", time: "Yesterday, 4:20 PM", kind: "Tasks", href: "/admin/tasks" },
  { id: "a4", title: "Client review awaiting approval", detail: "New feedback ready for moderation", time: "Yesterday, 2:10 PM", kind: "Reviews", href: "/admin/reviews" },
];
export const initialNotifications: AdminNotification[] = initialActivity.map((item, i) => ({ ...item, id: `notification-${i}`, read: i > 1 }));
