import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Base URL - update this when connecting a custom domain
const BASE_URL = 'https://src-foundry-hub.lovable.app';
const SITE_NAME = 'Southern Roof Consultants';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEO({ 
  title, 
  description, 
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const location = useLocation();
  const url = `${BASE_URL}${location.pathname}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

// Structured data for homepage
export function HomePageStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Southern Roof Consultants",
    "description": "Commercial roof consulting services for institutional investors",
    "url": BASE_URL,
    "telephone": "(727) 362-0116",
    "email": "info@southernroof.biz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "875 Pasadena Ave S, Suite A",
      "addressLocality": "South Pasadena",
      "addressRegion": "FL",
      "postalCode": "33707",
      "addressCountry": "US"
    },
    "areaServed": "United States",
    "serviceType": ["Roof Inspection", "Construction Management", "Due Diligence", "Storm Inspections"]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
