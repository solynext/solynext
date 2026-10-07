"use client";

import Link from "next/link";
import { ArrowUpRight, FolderKanban, Building2, Plus, ListTodo, CalendarDays, Inbox, Star, ArrowRight, CircleAlert } from "lucide-react";
import { deliveryMetrics, activeProject, DEMO_DATE, initials } from "@/lib/admin/selectors";
import { useAdmin } from "./AdminProvider";
import { AdminPageHeading, StatusBadge, ProgressBar, formatAdminDate } from "./AdminUI";
import { CardMotif } from "@/components/ui/CardMotif";
import styles from "./admin.module.css";

export function AdminDashboard() {
  const { collections: data, activity } = useAdmin();
  const metrics = deliveryMetrics(data);
  const inquiries = data.inquiries.filter(item => item.status === "New");
  const blocked = data.tasks.filter(item => item.status === "Blocked");
  const reviews = data.reviews.filter(item => item.status === "Pending");
  const projects = data.projects.filter(activeProject).sort((a, b) => (a.deadline ?? "9999").localeCompare(b.deadline ?? "9999"));
  const overdue = projects.filter(item => item.deadline && item.deadline < DEMO_DATE);
  const stats = [
    { label: "New inquiries", value: inquiries.length, detail: "Awaiting first response", icon: Inbox, tone: "pink", href: "inquiries" },
    { label: "Active projects", value: metrics.activeProjects, detail: `${metrics.completedProjects} completed projects`, icon: FolderKanban, tone: "blue", href: "projects" },
    { label: "Active clients", value: metrics.activeClients, detail: `${data.clients.filter(item => item.status === "Prospect").length} prospective partnerships`, icon: Building2, tone: "green", href: "clients" },
    { label: "Open tasks", value: metrics.pendingTasks, detail: `${blocked.length} blocked · ${data.tasks.filter(item => item.status === "Review").length} in review`, icon: ListTodo, tone: "amber", href: "tasks" },
  ];
  const attention = [
    { label: "New client inquiries", count: inquiries.length, href: "/admin/inquiries?status=New", icon: Inbox, detail: "Start a discovery conversation" },
    { label: "Blocked delivery tasks", count: blocked.length, href: "/admin/tasks?status=Blocked", icon: CircleAlert, detail: "Resolve blockers with your team" },
    { label: "Reviews to approve", count: reviews.length, href: "/admin/reviews?status=Pending", icon: Star, detail: "Review feedback before publication" },
    { label: "Overdue projects", count: overdue.length, href: "/admin/work-progress", icon: CalendarDays, detail: "Check the delivery plan" },
  ].filter(item => item.count > 0);

  return <>
    <AdminPageHeading title="Overview" description="Client conversations, project delivery, and your next priorities.">
      <Link href="/admin/projects?new=1" className={`${styles.button} ${styles.primary}`}><Plus size={17}/>New project</Link>
    </AdminPageHeading>
    <div className={styles.dashboardMeta}><span><CalendarDays size={14}/>Sample snapshot · 06 Oct 2026</span><Link href="/admin/work-progress">Delivery overview<ArrowUpRight size={14}/></Link></div>
    <div className={styles.overviewStats}>{stats.map(({ label, value, detail, icon: Icon, tone, href }) =>
      <Link key={label} href={`/admin/${href}`} className={`${styles.statCard} visual-card`} data-card-tone={tone}>
        <div className={styles.statArtwork}><CardMotif kind={label === "New inquiries" ? "Product design" : label === "Active clients" ? "Trust" : label === "Open tasks" ? "Business growth" : "Discovery"}/></div>
        <div><span className={`${styles.statIcon} ${styles[tone]}`}><Icon size={20}/></span><ArrowUpRight size={16}/></div>
        <p>{label}</p><strong>{value}</strong><small>{detail}</small>
      </Link>
    )}</div>
    <div className={styles.businessGrid}>
      <section className={`${styles.panel} ${styles.deliveryPanel} visual-card`} data-card-tone="blue">
        <div className={styles.panelHeading}><div><h2>Active projects</h2><p>Upcoming delivery, ordered by deadline</p></div><Link href="/admin/projects">View all<ArrowUpRight size={15}/></Link></div>
        {projects.length ? <div className={styles.tableScroll}><table className={`${styles.table} ${styles.dashboardTable}`}>
          <caption className={styles.srOnly}>Active client projects and delivery progress</caption>
          <thead><tr><th>Project / client</th><th>Status</th><th>Progress</th><th>Due date</th></tr></thead>
          <tbody>{projects.slice(0, 5).map(project => <tr key={project.id}>
            <td><Link href={`/admin/projects/${project.id}`} className={styles.dashboardProject}><span className={styles.recordAvatar}><FolderKanban size={18}/></span><span><strong>{project.title}</strong><small>{data.clients.find(client => client.id === project.clientId)?.title ?? "Unassigned client"}</small></span></Link></td>
            <td><StatusBadge status={project.status}/></td>
            <td><ProgressBar value={project.progress} label={project.title}/></td>
            <td><span className={project.deadline && project.deadline < DEMO_DATE ? styles.overdueDate : ""}>{formatAdminDate(project.deadline)}</span></td>
          </tr>)}</tbody>
        </table></div> : <div className={styles.emptyState}><FolderKanban size={30}/><h2>No active projects</h2><p>Create a project when a client engagement begins.</p><Link href="/admin/projects?new=1" className={`${styles.button} ${styles.secondary}`}>New project</Link></div>}
        <div className={styles.deliverySummary}><span><i/>{metrics.activeProjects} active engagements</span><Link href="/admin/work-progress">Track delivery<ArrowRight size={14}/></Link></div>
      </section>
      <section className={`${styles.panel} ${styles.attentionPanel} visual-card`} data-card-tone="pink">
        <div className={styles.panelHeading}><div><span className={styles.sectionKicker}>YOUR NEXT STEPS</span><h2>Needs attention</h2></div><span className={styles.attentionCount}>{attention.reduce((sum, item) => sum + item.count, 0)}</span></div>
        <div className={styles.attentionList}>{attention.map(({ label, count, href, icon: Icon, detail }) => <Link href={href} key={label}><span className={styles.attentionIcon}><Icon size={18}/></span><div><strong>{label}</strong><small>{detail}</small></div><b>{count}</b><ArrowUpRight size={15}/></Link>)}
          {!attention.length && <p className={styles.inlineEmpty}>You&apos;re all caught up. No pending actions.</p>}
        </div>
        <Link href="/admin/tasks?new=1" className={styles.attentionAction}><Plus size={16}/>Assign a task<ArrowRight size={15}/></Link>
      </section>
      <section className={`${styles.panel} visual-card`} data-card-tone="cyan">
        <div className={styles.panelHeading}><div><h2>New conversations</h2><p>Potential projects waiting for your team</p></div><Link href="/admin/inquiries">Open inbox<ArrowUpRight size={15}/></Link></div>
        <div className={styles.conversationList}>{inquiries.slice(0, 3).map(inquiry => <Link href={`/admin/inquiries/${inquiry.id}`} key={inquiry.id}><span className={styles.initialAvatar}>{initials(inquiry.title)}</span><div><strong>{inquiry.title}</strong><small>{inquiry.category}</small><p>{inquiry.description}</p></div><ArrowUpRight size={16}/></Link>)}
          {!inquiries.length && <p className={styles.inlineEmpty}>No new inquiries. Existing conversations are in your inbox.</p>}
        </div>
      </section>
      <section className={`${styles.panel} visual-card`} data-card-tone="purple">
        <div className={styles.panelHeading}><div><h2>Recent activity</h2><p>Updates from your workspace</p></div><Link href="/admin/activity">View all<ArrowUpRight size={15}/></Link></div>
        <ol className={styles.timeline}>{activity.slice(0, 4).map(item => <li key={item.id}><i/><div><Link href={item.href ?? "/admin/activity"}><strong>{item.title}</strong></Link><p>{item.detail}</p><small>{item.time}</small></div></li>)}</ol>
        {!activity.length && <p className={styles.inlineEmpty}>Workspace updates will appear here.</p>}
      </section>
    </div>
    <div className={styles.websiteShortcuts}><span>Website essentials</span><Link href="/admin/services">Services<ArrowUpRight size={14}/></Link><Link href="/admin/portfolio">Portfolio<ArrowUpRight size={14}/></Link><Link href="/admin/content">Content<ArrowUpRight size={14}/></Link><Link href="/admin/media">Media<ArrowUpRight size={14}/></Link></div>
  </>;
}
