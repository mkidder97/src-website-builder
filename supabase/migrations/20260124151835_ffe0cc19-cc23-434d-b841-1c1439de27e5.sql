-- Create calculator leads table for capturing potential clients
CREATE TABLE public.calculator_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  total_sqft integer,
  property_count integer,
  avg_roof_age integer,
  planned_replacements numeric,
  current_approach text,
  total_savings numeric,
  value_impact numeric,
  roi numeric,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calculator_leads ENABLE ROW LEVEL SECURITY;

-- Admin can view all leads
CREATE POLICY "Admin view all leads"
ON public.calculator_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert leads (public form submission)
CREATE POLICY "Anyone can submit calculator lead"
ON public.calculator_leads
FOR INSERT
WITH CHECK (true);

-- Admin can delete leads
CREATE POLICY "Admin delete leads"
ON public.calculator_leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));