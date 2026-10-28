SET search_path TO solynext_catalog, public;
CREATE TABLE service_categories (
 slug text PRIMARY KEY CHECK(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 name text NOT NULL CHECK(length(name) BETWEEN 1 AND 80),
 display_order integer NOT NULL DEFAULT 0 CHECK(display_order>=0)
);
INSERT INTO service_categories(slug,name,display_order) VALUES
 ('build','Development & Engineering',0),('design','Design & Branding',1),
 ('grow','Marketing & Growth',2),('advise','Consultation & Strategy',3),('support','Hosting & Support',4);
ALTER TABLE services ALTER COLUMN category TYPE text USING category::text;
ALTER TABLE services ADD CONSTRAINT services_category_fk FOREIGN KEY(category) REFERENCES service_categories(slug) ON UPDATE CASCADE;
ALTER TABLE services ADD COLUMN sub_services jsonb NOT NULL DEFAULT '[]';
ALTER TABLE services ADD COLUMN related_service_ids jsonb NOT NULL DEFAULT '[]';
ALTER TABLE services ADD COLUMN portfolio_ids jsonb NOT NULL DEFAULT '[]';
ALTER TABLE services ADD COLUMN app_ids jsonb NOT NULL DEFAULT '[]';
ALTER TABLE industries ADD COLUMN portfolio_ids jsonb NOT NULL DEFAULT '[]';
ALTER TABLE industries ADD COLUMN app_ids jsonb NOT NULL DEFAULT '[]';
