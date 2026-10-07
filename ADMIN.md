# SolyNext admin workspace

Open `/admin` while running `npm run dev`. Unauthenticated visitors go to `/admin/login`.

The temporary development identity is **admin@next.com / Admin123**. These values live only in the server-only authentication adapter, not in login placeholders or client components. You can override them with `ADMIN_DEV_EMAIL` and `ADMIN_DEV_PASSWORD`.

## Scope

This is a UI preview with a temporary authentication foundation. There is no database, business API, payment integration, file storage, email delivery, or production identity provider. All management changes remain in the workspace's in-memory React state. Navigation preserves them; a reload or sign-out resets them. A “Published” status in the preview never publishes to the public website. Media selection is a file-picker preview and does not upload the selected file.

The dashboard uses public content as the starting point for demo records, with separate client, staffing, task, notification, and delivery data. No public data is mutated. Settings and profile forms are preview preferences; they do not update login credentials or site metadata.

## Management workspace

- **Business:** clients, operational projects, tasks, work progress, and inquiries.
- **People:** team profiles, skills, availability, workload, roles, and responsibilities.
- **Website:** services, completed-work portfolio, partners, technologies, reviews, media, and content.
- **Management:** notifications, activity, settings, and admin profile.

Every collection supports search, status/category filtering, sorting, pagination, editing, and confirmed deletion. Client, project, team, and other records have dedicated `/admin/[section]/[id]` detail routes. Client details show contact information and project history. Project details include overview, tasks, timeline, notes, client, budget, deadlines, technologies, and assigned team. Tasks offer list and board views; status changes update the demo state and generate local activity and notifications. Reviews support approval, rejection, hiding, and featuring.

Operational project statuses are separate from portfolio publication statuses. Work progress derives completion and task counts from linked demo records. The dashboard and upcoming-deadline snapshot use the explicit demo date **6 October 2026**. Deleting a client, project, or team member clears dependent links without deleting related work.

## Routing and authorization

- `proxy.ts` is the installed Next.js 16 middleware convention. Its matcher covers `/admin` and all descendants, with the login page as the deliberate unauthenticated entry point.
- Server layouts, pages, and the repository independently call the authorization layer. Proxy is not the only security check.
- Sessions are HMAC-signed, role-checked, time-limited to eight hours, and stored in an HTTP-only, SameSite=Lax cookie scoped to `/admin`. Production cookies require HTTPS.
- Login and logout use Next.js Server Actions, including the framework's origin checks. No business API endpoints were added.
- Tampered, invalid, missing, and expired sessions redirect to login. Client session checks run on window focus and every minute; an expiry timer closes an open workspace.
- Admin pages are excluded from indexing, marked private/no-store, and disallow framing.
- Logout clears the browser cookie. Stateless tokens do not support remote revocation; replace them with revocable sessions when connecting real authentication.

## Production boundary

Temporary credentials are disabled in production by default. Production also fails closed without an `ADMIN_SESSION_SECRET` of at least 32 characters. To run an explicitly authorized demonstration build, set a random private secret and `ADMIN_ENABLE_DEV_AUTH=true`, and access it over HTTPS. Never use the development fallback signing key outside local development. Do not set any of these secrets through `NEXT_PUBLIC_*` variables.

This scaffold does not implement persistent login throttling, MFA, database sessions, password hashing/storage, granular roles, or audit persistence. Those belong in the future identity provider and backend. The development fallback is intentionally not production authentication.

## Integration points

| Area | Files | Future implementation |
| --- | --- | --- |
| Authentication | `lib/admin/auth/provider.ts`, `session.ts`, `dal.ts`, `actions.ts` | Identity provider, persistent sessions, role checks and throttling |
| Request protection | `proxy.ts` | Keep redirect checks aligned with the real provider |
| Data access | `lib/admin/repository.ts` | Authorized database or API adapter |
| Types / form definitions | `lib/admin/types.ts`, `sections.ts` | Extend resource fields and server validation |
| Local preview state | `components/admin/AdminProvider.tsx` | Queries, mutations, error and loading state |
| Reusable UI | `components/admin/AdminUI.tsx`, `AdminDialog.tsx`, `RecordForm.tsx`, `ManagementPage.tsx` | Retain UI and wire up authorized mutations |
| Route layouts | `app/admin/layout.tsx`, `app/admin/(workspace)/layout.tsx` | Retain the admin/public separation |
| Sample data | `data/admin/mockData.ts` | Replace with the repository's real records |
| Derived metrics and relationships | `lib/admin/selectors.ts` | Retain calculations or replace with authorized reporting queries |
| Events | `data/admin/activity.ts`, `AdminProvider.tsx`, `WorkspaceEvents.tsx` | Persistent notifications, audit records, and read state |
| Delivery UI | `ResourceDetails.tsx`, `TaskBoard.tsx`, `WorkProgress.tsx` | Project/task queries and authorized updates |

Only the root layout's chrome selection changes for integration. `PublicSiteFrame` renders the existing public navbar, motion system, pages and footer, and omits those elements on admin routes. Existing public route files, components and styles stay intact.

## Verification

Run `node --test tests/*.test.mjs` for authentication, derived delivery metrics, and safe deletion of linked records. Run `npm run build` for the production compilation and route checks; the existing Google Fonts configuration requires network access during the build.

Verification of the expanded workspace covered 21 protected and authorized routes, invalid/valid login, signed cookie behavior, credential separation, CRUD previews, search, pagination, task-board updates, client activation, notification read states, settings, mobile navigation, and logout. There were 36 layout checks across 320, 390, 768, and 1440 pixels, plus a focused project-detail check at 320 pixels. Project form checks covered date validation, budget/progress changes, preserved assignments, and detail tabs; team profiles and review moderation were also checked. Nine authentication and data tests pass.

All 67 public-site and authentication baseline files remain unchanged during this upgrade; the existing root-layout integration is retained.

## Admin UI refinement

The overview prioritizes new inquiries, active client projects, open tasks, and actionable review or delivery blockers. Counts derive from the existing workspace collections; no analytics, revenue, or trend data has been introduced. The sample snapshot remains explicitly dated 6 October 2026.

The sidebar is a flat list of Overview, Inquiries, Projects, Clients, Team, Website, and Settings. Related destinations appear in the page content: Projects includes Tasks and Delivery; Team includes Responsibilities; Website includes Content, Services, Portfolio, Reviews, Media, Technologies, and Partners; Settings includes Activity, Notifications, and Profile. The corresponding main item stays selected on child and detail routes. Existing management and detail routes remain available, including through workspace search.

Dashboard attention links open status-filtered management lists. The task board now occupies the management content area and displays the entire filtered task collection without list pagination. Dashboard projects use a compact table on desktop and stacked rows on mobile. Admin styling stays inside the existing CSS module; public pages and authentication are unchanged by this refinement.

The repository, collection types, authenticated data access, and mutation interface remain the integration points for a future backend. Preview edits still reset on reload; website publication and uploads remain disconnected.

The admin now also reuses the public `visual-card` styles and `CardMotif` artwork for overview cards, delivery cards, and task-board cards. Warm page colors, pastel surfaces, curved decorative layers, gradient icon tiles, and rounded controls match the public website. Tables and forms use quieter variants for legibility; no public styles were changed.

## Search and control audit

Admin collection pages, notifications, activity, and workspace search use shared search controls with one focus ring, consistent 44-pixel height, explicit labels, and clear actions. Category and sorting controls use the same dimensions and responsive layout. Search matches relevant relationship names, roles, skills, and technologies as well as the record text. Filters expose matching counts and reset actions; changing a filter clears hidden bulk selections. Table selection supports a partial-selection state, and pagination uses a bounded set of page buttons.

The controls are scoped against the public site's global input rules to prevent nested borders and duplicate focus outlines. Workspace search remains accessible on mobile, trims queries, and matches section paths. Dialog search focuses its input after capturing the trigger, allowing focus to return on close.

Browser verification covered 229 checks across all 13 collection pages, overview, delivery, settings, profile, activity, notifications, and four representative detail pages at 1440, 768, 390, and 320 pixels. Checks included matching and empty searches, category filters, sorting, add dialogs, linked-client searches, task-board updates, mobile workspace search, and focus restoration. No page overflow or browser exceptions were observed.

The flat-sidebar update passed 155 browser checks across the workspace and representative detail routes at 1440, 768, 390, and 320 pixels. The checks verified seven direct sidebar links, absence of nested sidebar menus, active parent selection, in-page links, mobile menu closing, and page overflow. No browser exceptions were observed.
