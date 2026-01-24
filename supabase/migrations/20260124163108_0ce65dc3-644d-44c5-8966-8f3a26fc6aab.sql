-- Create chatbot_leads table for FAQ bot submissions
CREATE TABLE public.chatbot_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  portfolio_size TEXT,
  service_interest TEXT,
  conversation_flow TEXT,
  is_storm_emergency BOOLEAN DEFAULT false,
  properties_affected INTEGER,
  location_state TEXT,
  damage_description TEXT
);

-- Enable RLS
ALTER TABLE public.chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for lead capture
CREATE POLICY "Anyone can submit chatbot lead"
ON public.chatbot_leads
FOR INSERT
WITH CHECK (true);

-- Admin can view all leads
CREATE POLICY "Admin view chatbot leads"
ON public.chatbot_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can delete leads
CREATE POLICY "Admin delete chatbot leads"
ON public.chatbot_leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add check constraints for validation
ALTER TABLE public.chatbot_leads
ADD CONSTRAINT chatbot_leads_name_length CHECK (char_length(name) <= 100),
ADD CONSTRAINT chatbot_leads_email_length CHECK (char_length(email) <= 255),
ADD CONSTRAINT chatbot_leads_phone_length CHECK (char_length(phone) <= 30),
ADD CONSTRAINT chatbot_leads_company_length CHECK (char_length(company) <= 200);