SET search_path TO solynext_catalog, public;
-- Stable IDs of the existing main-portfolio seed records. Only fill unassigned
-- industries; custom selections remain unchanged. Public rendering additionally
-- requires the corresponding main-portfolio project to remain published.
UPDATE industries SET portfolio_ids='["pak-auto-parts"]'::jsonb,updated_at=now()
 WHERE slug='transport-automotive' AND portfolio_ids='[]'::jsonb;
UPDATE industries SET portfolio_ids='["prime-property-hub"]'::jsonb,updated_at=now()
 WHERE slug='real-estate' AND portfolio_ids='[]'::jsonb;
UPDATE industries SET portfolio_ids='["noor-boutique"]'::jsonb,updated_at=now()
 WHERE slug='ecommerce' AND portfolio_ids='[]'::jsonb;
UPDATE industries SET portfolio_ids='["al-madina-traders","noor-boutique","fresh-basket","urban-chai"]'::jsonb,updated_at=now()
 WHERE slug='retail-trading' AND portfolio_ids='[]'::jsonb;
