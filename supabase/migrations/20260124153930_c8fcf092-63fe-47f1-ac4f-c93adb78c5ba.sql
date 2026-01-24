-- Add validation constraints to calculator_leads table
ALTER TABLE public.calculator_leads
  ADD CONSTRAINT valid_total_sqft CHECK (total_sqft IS NULL OR (total_sqft >= 0 AND total_sqft < 1000000000)),
  ADD CONSTRAINT valid_property_count CHECK (property_count IS NULL OR (property_count >= 0 AND property_count < 100000)),
  ADD CONSTRAINT valid_avg_roof_age CHECK (avg_roof_age IS NULL OR (avg_roof_age >= 0 AND avg_roof_age <= 100)),
  ADD CONSTRAINT valid_planned_replacements CHECK (planned_replacements IS NULL OR planned_replacements >= 0),
  ADD CONSTRAINT valid_total_savings CHECK (total_savings IS NULL OR total_savings >= 0),
  ADD CONSTRAINT valid_value_impact CHECK (value_impact IS NULL OR value_impact >= 0),
  ADD CONSTRAINT valid_roi CHECK (roi IS NULL OR roi >= 0);

-- Create a rate limiting table for lead submissions
CREATE TABLE IF NOT EXISTS public.lead_submission_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash text NOT NULL,
  submitted_at timestamp with time zone DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_lead_submission_email_hash ON public.lead_submission_log(email_hash, submitted_at);

-- Enable RLS on the log table
ALTER TABLE public.lead_submission_log ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for logging purposes)
CREATE POLICY "Allow insert for rate limiting"
ON public.lead_submission_log
FOR INSERT
WITH CHECK (true);

-- Only admins can view the log
CREATE POLICY "Admin view submission log"
ON public.lead_submission_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create a function to check rate limits (max 5 submissions per email per hour)
CREATE OR REPLACE FUNCTION public.check_calculator_rate_limit(p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  email_hash text;
  recent_count integer;
BEGIN
  -- Hash the email for privacy
  email_hash := encode(digest(lower(trim(p_email)), 'sha256'), 'hex');
  
  -- Count recent submissions (last hour)
  SELECT COUNT(*) INTO recent_count
  FROM public.lead_submission_log
  WHERE lead_submission_log.email_hash = check_calculator_rate_limit.email_hash
    AND submitted_at > now() - interval '1 hour';
  
  -- If under limit, log this submission and return true
  IF recent_count < 5 THEN
    INSERT INTO public.lead_submission_log (email_hash) VALUES (email_hash);
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;