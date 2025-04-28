/*
  # Add RLS policies for Master_users_form table

  1. Security
    - Enable RLS on "Master_users_form" table
    - Add policy for public inserts
    - Add policy for authenticated users to read data
*/

-- Enable RLS
ALTER TABLE "Master_users_form" ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public inserts"
ON "Master_users_form"
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read all data"
ON "Master_users_form"
FOR SELECT
TO authenticated
USING (true);