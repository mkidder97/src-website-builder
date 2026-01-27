-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public insert (anyone can submit the form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin-only read access
CREATE POLICY "Admin view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only delete
CREATE POLICY "Admin delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));