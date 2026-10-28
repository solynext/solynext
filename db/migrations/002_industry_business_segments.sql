ALTER TABLE solynext_catalog.industries
ADD COLUMN IF NOT EXISTS business_segments jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE solynext_catalog.industries
ADD CONSTRAINT industries_business_segments_array CHECK (jsonb_typeof(business_segments) = 'array');
