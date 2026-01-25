-- Add explicit deny policies for non-admin access to sensitive lead tables
-- This provides defense-in-depth against accidental permissive policy additions

-- Add deny policy for calculator_leads (contains PII: emails, business data)
CREATE POLICY "Deny non-admin read access"
ON public.calculator_leads
FOR SELECT
USING (false);

-- Add deny policy for chatbot_leads (contains PII: names, emails, phones, company info)
CREATE POLICY "Deny non-admin read access"
ON public.chatbot_leads
FOR SELECT
USING (false);