-- =============================================
-- Blue Physio Clinic — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  service     TEXT NOT NULL,
  branch      TEXT NOT NULL,
  date        DATE NOT NULL,
  time        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique constraint: one booking per slot per branch
ALTER TABLE bookings
  ADD CONSTRAINT unique_branch_date_time UNIQUE (branch, date, time);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can insert (book an appointment)
CREATE POLICY "Allow public insert"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: anyone can read bookings (needed for slot availability)
CREATE POLICY "Allow public select"
  ON bookings FOR SELECT
  TO anon
  USING (true);

-- Policy: only authenticated users (admins) can update status
CREATE POLICY "Allow authenticated update"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: only authenticated users (admins) can delete
CREATE POLICY "Allow authenticated delete"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Index for fast slot lookups
CREATE INDEX IF NOT EXISTS idx_bookings_branch_date
  ON bookings (branch, date);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_bookings_status
  ON bookings (status);
