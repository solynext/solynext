export type ManagementSection = "projects" | "services" | "technologies" | "clients" | "reviews" | "team" | "media" | "inquiries" | "content" | "tasks" | "portfolio" | "partners" | "roles";
export interface AdminRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  updatedAt: string;
  email?: string;
  image?: string;
  rating?: number;
  clientId?: string;
  projectId?: string;
  assignedTeam?: string[];
  assignedTo?: string;
  projectType?: string;
  startDate?: string;
  deadline?: string;
  completionDate?: string;
  budget?: number;
  progress?: number;
  priority?: "Low" | "Medium" | "High" | "Urgent";
  technologies?: string[];
  phase?: string;
  notes?: string;
  phone?: string;
  contactName?: string;
  location?: string;
  company?: string;
  role?: string;
  skills?: string[];
  availability?: string;
  workload?: number;
  featured?: boolean;
  displayOrder?: number;
  icon?: string;
  url?: string;
  followUpDate?: string;
  followUpStatus?: string;
  milestones?: { id: string; title: string; date: string; status: string }[];
}
export type AdminCollections = Record<ManagementSection, AdminRecord[]>;
export interface SectionDefinition {
  label: string; singular: string; description: string; titleLabel: string; categoryLabel: string; statuses: string[]; categories: string[];
}
export interface AdminActivity { id: string; title: string; detail: string; time: string; kind?: string; href?: string }
export interface AdminNotification extends AdminActivity { read: boolean }
