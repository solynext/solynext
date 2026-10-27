CREATE SCHEMA IF NOT EXISTS solynext_catalog;
SET search_path TO solynext_catalog, public;
CREATE TYPE content_status AS ENUM ('draft','published','archived');
CREATE TYPE service_tag AS ENUM ('BUILD','CREATE','GROW','CONNECT','SUPPORT','ADVISE');
CREATE TYPE service_category AS ENUM ('build','design','grow','support','advise');
CREATE TYPE admin_role AS ENUM ('super_admin','editor');
CREATE TABLE admin_users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, password_hash text NOT NULL, role admin_role NOT NULL DEFAULT 'editor', created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE services (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL,
 tag service_tag NOT NULL, category service_category NOT NULL, tagline text NOT NULL, card_summary varchar(120) NOT NULL, overview text NOT NULL,
 icon text NOT NULL DEFAULT 'Laptop', hero_image text,
 what_we_deliver jsonb NOT NULL DEFAULT '[]', who_its_for jsonb NOT NULL DEFAULT '[]', technologies jsonb NOT NULL DEFAULT '[]', deliverables jsonb NOT NULL DEFAULT '[]',
 approach_steps jsonb NOT NULL DEFAULT '[]', engagement_options jsonb NOT NULL DEFAULT '[]', suggested_solutions jsonb NOT NULL DEFAULT '[]', faqs jsonb NOT NULL DEFAULT '[]',
 cta_heading text NOT NULL, cta_text text NOT NULL, seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '', og_image text,
 is_featured boolean NOT NULL DEFAULT false, featured_order integer, display_order integer NOT NULL DEFAULT 0,
 status content_status NOT NULL DEFAULT 'draft', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz, deleted_at timestamptz,
 CHECK(display_order>=0), CHECK(featured_order IS NULL OR featured_order>=0)
);
CREATE TABLE industries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL, tagline text NOT NULL, card_summary varchar(120) NOT NULL,
 overview text NOT NULL, icon text NOT NULL DEFAULT 'Building2', hero_image text,
 challenges jsonb NOT NULL DEFAULT '[]', capabilities jsonb NOT NULL DEFAULT '[]', outcomes jsonb NOT NULL DEFAULT '[]', technologies jsonb NOT NULL DEFAULT '[]',
 suggested_solutions jsonb NOT NULL DEFAULT '[]', faqs jsonb NOT NULL DEFAULT '[]', cta_heading text NOT NULL, cta_text text NOT NULL,
 seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '', og_image text,
 is_featured boolean NOT NULL DEFAULT false, featured_order integer, display_order integer NOT NULL DEFAULT 0, status content_status NOT NULL DEFAULT 'draft',
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz, deleted_at timestamptz,
 CHECK(display_order>=0), CHECK(featured_order IS NULL OR featured_order>=0)
);
CREATE TABLE portfolio_projects (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, client_name text NOT NULL, industry_summary text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', thumbnail text NOT NULL, url text NOT NULL DEFAULT '', status content_status NOT NULL DEFAULT 'draft', display_order integer NOT NULL DEFAULT 0);
CREATE TABLE service_industries(service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE, industry_id uuid NOT NULL REFERENCES industries(id) ON DELETE CASCADE, PRIMARY KEY(service_id,industry_id));
CREATE TABLE service_projects(service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE, project_id uuid NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE, PRIMARY KEY(service_id,project_id));
CREATE TABLE industry_projects(industry_id uuid NOT NULL REFERENCES industries(id) ON DELETE CASCADE, project_id uuid NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE, PRIMARY KEY(industry_id,project_id));
CREATE TABLE inquiries(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, phone text NOT NULL DEFAULT '', company text NOT NULL DEFAULT '', message text NOT NULL, source_page text NOT NULL, service_id uuid REFERENCES services(id), industry_id uuid REFERENCES industries(id), solution_name text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE page_sections(key text PRIMARY KEY, data jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE audit_log(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), admin_user_id uuid NOT NULL REFERENCES admin_users(id), action text NOT NULL, entity text NOT NULL, entity_id text NOT NULL, diff jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE slug_redirects(entity text NOT NULL CHECK(entity IN ('services','industries')), old_slug text NOT NULL, new_slug text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(entity,old_slug));
CREATE INDEX services_public_idx ON services(status,display_order) WHERE deleted_at IS NULL;
CREATE INDEX services_featured_idx ON services(featured_order) WHERE status='published' AND is_featured AND deleted_at IS NULL;
CREATE INDEX industries_public_idx ON industries(status,display_order) WHERE deleted_at IS NULL;
CREATE INDEX audit_entity_idx ON audit_log(entity,entity_id,created_at DESC);