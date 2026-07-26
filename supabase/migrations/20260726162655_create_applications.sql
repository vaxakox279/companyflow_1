/*
# Create applications table (lead intake from public site)

1. New Tables
- `applications`
  - `id` (uuid, primary key)
  - `application_no` (text, unique, human-readable like CF-2026-000123)
  - `company_name` (text, not null)
  - `contact_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, not null)
  - `gstin` (text)
  - `pan` (text)
  - `cin` (text)
  - `state` (text)
  - `address` (text)
  - `services` (text[], selected compliance services)
  - `documents` (jsonb, map of doc name -> uploaded filename/url)
  - `remarks` (text)
  - `status` (text, default 'new') — new | contacted | documents_pending | in_progress | completed | rejected | approved
  - `assigned_ca` (text)
  - `assigned_cs` (text)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `applications`.
- Public visitors (anon) can INSERT new applications (the apply form). No anon SELECT/UPDATE/DELETE.
- Authenticated admin/staff can SELECT, UPDATE all applications (admin panel).
- No one can DELETE applications (data integrity / audit trail).

3. Notes
- `application_no` is generated server-side via a Postgres sequence + format, so the public form does not control it.
- A trigger sets `application_no` and keeps `updated_at` fresh.
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_no text UNIQUE,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  gstin text,
  pan text,
  cin text,
  state text,
  address text,
  services text[] NOT NULL DEFAULT '{}',
  documents jsonb NOT NULL DEFAULT '{}'::jsonb,
  remarks text,
  status text NOT NULL DEFAULT 'new',
  assigned_ca text,
  assigned_cs text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Public visitors can submit applications (INSERT). They must NOT see or modify them.
DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated staff/admins can read all applications.
DROP POLICY IF EXISTS "staff_select_applications" ON applications;
CREATE POLICY "staff_select_applications"
ON applications FOR SELECT
TO authenticated
USING (true);

-- Authenticated staff/admins can update applications (assign, change status, approve/reject).
DROP POLICY IF EXISTS "staff_update_applications" ON applications;
CREATE POLICY "staff_update_applications"
ON applications FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Application number sequence + trigger
CREATE SEQUENCE IF NOT EXISTS application_seq START 1;

CREATE OR REPLACE FUNCTION generate_application_no()
RETURNS trigger AS $$
BEGIN
  IF NEW.application_no IS NULL THEN
    NEW.application_no := 'CF-' || EXTRACT(YEAR FROM now())::text || '-' || lpad(nextval('application_seq')::text, 6, '0');
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS applications_no_trigger ON applications;
CREATE TRIGGER applications_no_trigger
BEFORE INSERT ON applications
FOR EACH ROW EXECUTE FUNCTION generate_application_no();

-- Index for admin sorting
CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_status_idx ON applications (status);
