# SolyNext Apps

## Manage apps

Sign in to `/admin/apps` (also available under Website → SolyNext Apps).
Add a name, category, URL, short description and image. Details, developer, version, featured placement and display order are optional. Images must be JPG, PNG or WebP, at most 4 MB. The server crops from the center to 512 × 512 WebP.

New apps start as Draft. Change Status to Published and save to make an app visible at `/solynext-apps`. Edit, preview and delete controls are available for every app. Drafts are hidden from the public catalog.

## Launching apps

Selecting a public card opens the URL inside a modal iframe. The player includes reload, expanded view, close, app details and an external link. The app provider must allow iframe embedding using its Content-Security-Policy / X-Frame-Options configuration. Sites which block embedding must be opened with the new-tab link. HTTPS deployments should use HTTPS app URLs to avoid mixed-content blocking. No app code is downloaded or proxied by the server.

## Persistent deployment storage

Catalog data and uploaded icons are stored in `.data/apps/` by default. This folder is excluded from Git. Set `APPS_DATA_DIR` to an absolute directory on a persistent writable volume in production. Back up both `apps.json` and its `images/` directory. Ephemeral/serverless filesystem deployments need a persistent database/object-storage adapter before production use, as with the existing project/client file stores. The file store serializes writes within one server process and uses atomic replacement; run a single writer instance or use a database for multi-instance deployments.

All mutations require the existing administrator session. Configure production administrator authentication using the project's existing auth setup. Old image files remain on disk after replacement/deletion to keep previously loaded URLs working; include the image directory in storage maintenance.

## Validation

`node --test tests/apps.test.mjs` checks URL/input validation, draft filtering, ordering, concurrent writes, persistence, editing, deletion and duplicate rejection.