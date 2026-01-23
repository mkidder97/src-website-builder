-- Add explicit deny policy for non-admin users on user_roles table
-- This prevents accidental exposure if a permissive policy is added in the future

CREATE POLICY "Deny non-admin read access"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also add explicit deny for anonymous users
CREATE POLICY "Deny anonymous access"
ON public.user_roles
FOR SELECT
TO anon
USING (false);