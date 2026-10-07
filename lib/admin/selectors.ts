import type { AdminCollections, AdminRecord, ManagementSection } from "./types";

export const DEMO_DATE = "2026-10-06";
export const PROJECT_PHASES = ["Discovery", "Design", "Development", "Quality assurance", "Launch", "Completed"];
export const PROJECT_TYPES = ["Web application", "Mobile application", "Custom software", "Product design", "Brand identity", "Marketing campaign"];
export const PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;
export const TASK_STATUSES = ["To Do", "In Progress", "Review", "Completed", "Blocked"];
export const activeProject = (record: AdminRecord) => ["Active", "In Progress"].includes(record.status);
export const initials = (name: string) => name.split(/\s+/).map(word => word[0]).slice(0, 2).join("").toUpperCase();
export const projectTasks = (data: AdminCollections, id: string) => data.tasks.filter(task => task.projectId === id);
export const clientProjects = (data: AdminCollections, id: string) => data.projects.filter(project => project.clientId === id);
export function deliveryMetrics(data: AdminCollections) {
  const ongoing = data.projects.filter(activeProject);
  return {
    totalClients: data.clients.length, activeClients: data.clients.filter(c => c.status === "Active").length,
    totalProjects: data.projects.length, activeProjects: ongoing.length,
    completedProjects: data.projects.filter(p => p.status === "Completed").length,
    pendingProjects: data.projects.filter(p => ["New", "Pending"].includes(p.status)).length,
    inProgressProjects: data.projects.filter(p => p.status === "In Progress").length,
    pendingTasks: data.tasks.filter(t => t.status !== "Completed").length,
    completedTasks: data.tasks.filter(t => t.status === "Completed").length,
    overallProgress: ongoing.length ? Math.round(ongoing.reduce((sum, p) => sum + (p.progress ?? 0), 0) / ongoing.length) : 0,
  };
}

/** Remove local records without leaving invalid demo references. Does not cascade delete. */
export function removeRecords(data: AdminCollections, section: ManagementSection, ids: string[]): AdminCollections {
  const next = { ...data, [section]: data[section].filter(record => !ids.includes(record.id)) };
  if (section === "clients") {
    for (const linked of ["projects", "portfolio", "reviews"] as const) next[linked] = next[linked].map(p => ids.includes(p.clientId ?? "") ? { ...p, clientId: undefined } : p);
  }
  if (section === "projects") {
    next.tasks = next.tasks.map(t => ids.includes(t.projectId ?? "") ? { ...t, projectId: undefined } : t);
    next.portfolio = next.portfolio.map(p => ids.includes(p.projectId ?? "") ? { ...p, projectId: undefined } : p);
  }
  if (section === "team") {
    next.projects = next.projects.map(p => ({ ...p, assignedTeam: p.assignedTeam?.filter(id => !ids.includes(id)) }));
    next.tasks = next.tasks.map(t => ids.includes(t.assignedTo ?? "") ? { ...t, assignedTo: undefined } : t);
    next.inquiries = next.inquiries.map(t => ids.includes(t.assignedTo ?? "") ? { ...t, assignedTo: undefined } : t);
  }
  return next;
}
