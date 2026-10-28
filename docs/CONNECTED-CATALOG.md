# Services and industries

The catalog contains 11 services, 101 supplied sub-services, eight industries and 53 business specialisms. Existing service URLs and published records are retained.

## Managing content

- Open `/admin/services` to create, edit, publish, archive and feature services. Expand **Manage service categories** to create categories, rename their labels or change their order. Category keys stay stable. A category can only be deleted after all its services, including archived/deleted records, have been reassigned.
- In **Content**, edit the overview and each sub-service with its related businesses. The existing capabilities and handover lists remain available.
- In **Industries & Work**, choose industries, related services, portfolio projects and products. Relationships with industries are shared in both directions. Project and product selections use stable record IDs, so title/URL changes do not break the selection.
- Open `/admin/industries` to manage industry overviews, challenges, outcomes, FAQs and business specialisms. Choose services, portfolio projects and products in **Services & Work**.
- Client names and project content come from the published main portfolio. Products come from published entries in `/admin/apps`. Draft/archived projects and products are never shown in public detail pages. Legacy catalog project selections resolve to matching published portfolio slugs for compatibility.
- Related services can be explicitly chosen. With no explicit selection, the public page suggests published services sharing an industry or category.

## Homepage placement

A record must be both **published** and **featured** to appear on the homepage. Featured order determines placement, with display order as a fallback. The section's maximum item count is managed under **Home section**. If nothing qualifies, the section is hidden. There is no fallback that silently displays unfeatured industries.

## Applying to another environment

1. Install the locked dependencies with `npm ci`.
2. Configure `DATABASE_URL` in `.env.local` or the hosting environment.
3. Run `npm run catalog:migrate` before starting the updated application. Migration 003 adds editable categories and relationship/content fields. Migration 004 adds the supplied sub-services only where absent and enriches empty industry fields. Migration 005 connects the existing client case studies to their matching industries where no portfolio assignment exists. Existing edited overviews, visibility settings and assignments are preserved.
4. For a completely new database, run `npm run catalog:seed` with the existing administrator environment settings configured. Seeding does not overwrite existing records.

The configured database was backed up under `.data/catalog-backups/` before the upgrade. Keep these snapshots private; the directory is ignored by Git.

## Verification

```sh
node --test tests/catalog.test.mjs tests/apps.test.mjs tests/portfolio-publishing.test.mjs tests/clients.test.mjs
npm run build
```

Catalog tests use an isolated PGlite database. They exercise migration compatibility, CRUD, reciprocal relationships, category deletion constraints, draft isolation and strict homepage featuring, as well as the supplied content totals.
