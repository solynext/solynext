# Services and industries catalog

This module is limited to services, industries, their home sections, listings, detail pages, administration, related work and contextual inquiries. Existing app/game, client, project delivery, portfolio and other website systems are retained.

## Database setup

Node.js 24+ is recommended. Put `DATABASE_URL` in the ignored `.env.local` file. Use a PostgreSQL connection with verified TLS. The migration creates a separate `solynext_catalog` schema and does not replace existing tables outside it.

Run:

```powershell
npm install
npm run catalog:migrate
npm run catalog:seed
npm run dev
```

`db/schema.ts` defines the Drizzle schema. Versioned SQL lives in `db/migrations/`. The CLI applies each migration once in a transaction with an advisory lock. Seeding is idempotent and never overwrites existing content. All 11 services are transcribed in `db/seeds/services.json`, along with source relationships. The seed includes six related-work records with replaceable thumbnails. Industry records are imported only from `db/seeds/industries.json` when that file is supplied; no industry claims are invented. Re-running the seed resolves pending industry/service links.

`DATABASE_URL`, session secrets, passwords and runtime uploads must never be committed. Production needs a persistent upload directory (`CATALOG_UPLOAD_DIR`) or an object-storage adapter.

## Admin setup and permissions

The initial super administrator uses the existing `ADMIN_DEV_EMAIL` and `ADMIN_DEV_PASSWORD` environment values. Its password is hashed with salted scrypt in `admin_users`. Existing administrator login/session behavior is retained. Database-created catalog accounts sign in through `/admin/login` and are restricted to services and industries; unrelated workspace collections are not loaded for them. For production, set a strong `ADMIN_SESSION_SECRET` (32+ characters), `CATALOG_SIGNING_SECRET` (32+ characters) and the existing application's `ADMIN_ENABLE_DEV_AUTH=true` if using its built-in authentication adapter.

Create or update an additional catalog account without putting a password in the command line:

```powershell
$env:CATALOG_USER_PASSWORD = 'set-a-unique-password'
node scripts/catalog-admin.cjs editor@example.com editor
Remove-Item Env:CATALOG_USER_PASSWORD
```

Use `super_admin` instead of `editor` for delete permission. Every mutation checks catalog access. Only super admins can soft-delete. Existing session cookies remain HTTP-only, SameSite and scoped to admin. Catalog JSON APIs use short-lived scoped bearer tokens issued only after server-side session and database-role verification; cross-origin mutation requests are rejected. Next.js protects the image-upload Server Action with its origin checks. Login and inquiry endpoints are rate-limited in process; use a shared rate-limit adapter for multi-instance deployment.

## Public flow

- `/`: published, featured services ordered by featured order and limited by the saved home settings; featured industries use equivalent settings.
- `/services`: all published services, category grouping, search and filters; editable optional sections.
- `/services/[slug]`: service details, industries, work, solutions, engagement, FAQs, contact context and previous/next navigation.
- `/solutions`: published industries.
- `/solutions/[slug]`: industry details and linked services/work.
- `/contact?service=slug&industry=slug&solution=name`: contextual inquiry form writes to the catalog database. The existing non-contextual contact page remains unchanged.

Drafts and archives return 404 on public pages/APIs. Signed preview URLs expire after ten minutes and use noindex metadata. Deleted records are excluded everywhere. Published slug changes create HTTP 301 redirects, including flattened redirects after multiple renames. Service/FAQ JSON-LD is escaped against script injection. Rich text is sanitized on save.

## Admin flow

- `/admin/services` and `/admin/industries`: search/filter, selection and bulk publish/unpublish/archive, drag-and-drop ordering and keyboard order buttons, feature toggle, duplicate, signed preview, archive and soft delete.
- Tabs edit all content, relations, solutions, FAQ, approach, engagement, CTA and SEO fields. The four approach steps are editable. Complete valid draft forms autosave every 30 seconds. Optimistic revision checks prevent silently overwriting another editor.
- `.../settings/home-section`: heading, label, subheading, link, max items, featured choices and drag/keyboard featured ordering.
- `.../settings/listing-page`: editable listing copy and section toggles.
- `/admin/services/work`: update related-work copy, status and thumbnails without changing the separate project-delivery/portfolio subsystem.
- `/admin/services/inquiries`: latest 200 contextual inquiries with service, industry and requested solution.

Every create, update, reorder, status change, settings edit and delete writes an audit entry in the same transaction. Removed content is retained with `deleted_at`. Slugs remain unique even after deletion.

## API

Authenticated: `GET/POST /api/admin/services`, `GET/PUT/DELETE /api/admin/services/[id]`, `POST /api/admin/services/reorder`, `POST /api/admin/services/bulk`, `POST /api/admin/services/[id]/duplicate`, `GET /api/admin/services/[id]/preview`. Equivalent industry endpoints are available. Settings: `GET/PUT /api/admin/page-sections/[key]`. Related work: `GET/PUT /api/admin/catalog-projects`.

Public: `GET /api/services`, `GET /api/services/[slug]`, equivalent `/api/industries` endpoints, and `POST /api/catalog-inquiries`.

All admin payloads use Zod. Database writes use parameterized Drizzle SQL and transactional relation replacement. Every write invalidates the services/industries/sections cache tags immediately and revalidates affected public pages and sitemap.

## Test checklist

```powershell
node --test tests/catalog.test.mjs
npx tsc --noEmit
```

The isolated tests run the actual PostgreSQL migration in PGlite (test dependency only), then verify seed validation, summary/slug restrictions, sanitization, CRUD, draft isolation, linked records, revisions, redirects, audit entries, delete roles and settings validation.

Browser checks should cover: anonymous API denial; administrator/editor logins; draft 404 and signed preview; publishing; changing a published slug; featured ordering and limits; listing search; detail section order; solution contact prefilling and successful database persistence; linked industries/work; revalidation after settings changes; duplicate/archive/bulk actions; keyboard modal closure; mobile overflow. No Lighthouse score is claimed without running an audit against the deployed site.
### Vercel deployment

Set DATABASE_URL in Vercel Project Settings → Environment Variables for Production (and Preview if used), then redeploy. Local .env.local files are ignored and are not sent to Vercel. Use the PostgreSQL provider connection string with sslmode=verify-full; never commit credentials. Database-backed public queries wait for a request, so builds do not require a database connection. Serving those pages still requires the runtime environment variable. Run catalog:migrate and catalog:seed against the target database before serving catalog content.
