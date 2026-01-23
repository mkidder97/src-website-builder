-- Create app_role enum for admin management
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- KPIs table
CREATE TABLE public.kpis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  suffix TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default KPIs
INSERT INTO public.kpis (key, label, value, suffix, display_order) VALUES
  ('sqft_managed', 'Square Feet Managed', '455', 'M+', 1),
  ('asset_value', 'Total Asset Value', '3', 'B+', 2),
  ('properties', 'Properties Inspected', '2500', '+', 3),
  ('states', 'States Covered', '28', '', 4),
  ('years', 'Years in Business', '15', '+', 5),
  ('inspections', 'Annual Inspections', '1200', '+', 6);

-- Blog categories table
CREATE TABLE public.blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- Insert default categories
INSERT INTO public.blog_categories (name, slug, display_order) VALUES
  ('Industry Insights', 'industry-insights', 1),
  ('Roof Maintenance Tips', 'maintenance-tips', 2),
  ('Case Studies', 'case-studies', 3),
  ('Company News', 'company-news', 4),
  ('Technology & Innovation', 'technology', 5);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT DEFAULT 'Industry Insights',
  author TEXT DEFAULT 'SRC Team',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User roles table for admin management
CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Public read policies
CREATE POLICY "Public read kpis" ON public.kpis FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read categories" ON public.blog_categories FOR SELECT USING (true);

-- Admin policies for KPIs
CREATE POLICY "Admin update kpis" ON public.kpis FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin insert kpis" ON public.kpis FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete kpis" ON public.kpis FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for blog posts (admins can see all posts including drafts)
CREATE POLICY "Admin select all posts" ON public.blog_posts FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin insert posts" ON public.blog_posts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update posts" ON public.blog_posts FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete posts" ON public.blog_posts FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for categories
CREATE POLICY "Admin insert categories" ON public.blog_categories FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update categories" ON public.blog_categories FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete categories" ON public.blog_categories FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies (only admin can view/manage roles)
CREATE POLICY "Admin view roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at on blog_posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();