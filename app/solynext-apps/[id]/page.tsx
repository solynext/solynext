import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { getPublicApps } from "@/lib/apps/repository";
import { demoApps } from "@/lib/apps/demo-catalog";
import styles from "./AppDetail.module.css";

async function findApp(id: string) {
  const apps = await getPublicApps();
  return (apps.length ? apps : demoApps).find(app => app.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const app = await findApp(id);
  return app ? { title: `${app.name} | SolyNext Apps`, description: app.description } : { title: "App not found | SolyNext" };
}

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = await findApp(id);
  if (!app) notFound();
  const isDownload = /downloads?/i.test(app.category);
  const status = app.currentStatus || (app.status === "Published" ? "Available" : "In development");
  return <main id="main-content" className={styles.page}><div className="premium-container">
    <Link className={styles.back} href={`/solynext-apps?tab=${isDownload ? "downloads" : /games?/i.test(app.category) ? "games" : "apps"}`}><ArrowLeft size={17}/> Back to SolyNext Apps</Link>
    <section className={styles.hero}><div className={styles.heroCopy}><p className={styles.eyebrow}>{app.category} · SOLYNEXT APPS</p><h1>{app.name}</h1><p className={styles.summary}>{app.description}</p><div className={styles.heroTags}><span>{status}</span>{app.version && <span>{app.version}</span>}{app.platforms?.map(platform => <span key={platform}>{platform}</span>)}</div><div className={styles.actions}>{isDownload ? <a className={styles.primary} href={`/app-demos/downloads/${app.id}`}><Download size={17}/>Download sample</a> : <a className={styles.primary} href={app.url} target="_blank" rel="noreferrer">Open preview<ExternalLink size={16}/></a>}{app.website && <a className={styles.secondary} href={app.website} target="_blank" rel="noreferrer">Owner website<ArrowUpRight size={16}/></a>}</div></div><div className={styles.heroImage}><Image src={app.image} alt={`${app.name} preview`} fill unoptimized sizes="(max-width:800px) 100vw, 50vw" priority/></div></section>
    <div className={styles.contentGrid}><div className={styles.mainColumn}>
      <section className={styles.panel}><p className={styles.eyebrow}>PRODUCT OVERVIEW</p><h2>Purpose and product details</h2><p>{app.purpose || app.details || app.description}</p>{app.details && app.purpose && <p className={styles.longText}>{app.details}</p>}</section>
      {app.features?.length ? <section className={styles.panel}><p className={styles.eyebrow}>WHAT IT OFFERS</p><h2>Key features</h2><ul className={styles.featureList}>{app.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section> : null}
      <section className={styles.panel}><p className={styles.eyebrow}>DELIVERY</p><h2>People behind the product</h2><div className={styles.peopleGrid}><div><small>Product owner</small><strong>{app.owner || "Not provided"}</strong><span>{app.ownerType || "Owner type not provided"}</span></div><div><small>Agency or company</small><strong>{app.agency || app.developer || "Not provided"}</strong><span>{app.website ? <a href={app.website} target="_blank" rel="noreferrer">Visit website <ArrowUpRight size={13}/></a> : "Company details not provided"}</span></div><div className={styles.team}><small>Development team</small><p>{app.developmentTeam || "Team information has not been added yet."}</p></div></div></section>
    </div><aside className={styles.sideColumn}><section className={styles.panel}><p className={styles.eyebrow}>AT A GLANCE</p><h2>Product status</h2><dl className={styles.facts}><div><dt>Current status</dt><dd>{status}</dd></div><div><dt>Product type</dt><dd>{app.category}</dd></div><div><dt>Release</dt><dd>{app.releaseDate || "Not specified"}</dd></div><div><dt>Version</dt><dd>{app.version || "Not specified"}</dd></div><div><dt>Audience</dt><dd>{app.audience || "Not specified"}</dd></div><div><dt>Last updated</dt><dd>{new Date(app.updatedAt).toLocaleDateString("en", { dateStyle: "medium" })}</dd></div></dl></section><section className={styles.panel}><p className={styles.eyebrow}>MORE INFORMATION</p><h2>Product listing</h2><p>Product information is supplied by its owner or delivery team. Sample listings use illustrative details. Contact SolyNext to ask about customization, access, or a similar product.</p><Link className={styles.contactLink} href="/contact">Ask about this product <ArrowUpRight size={16}/></Link></section></aside></div>
  </div></main>;
}
