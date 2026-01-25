import { Layout } from "@/components/layout/Layout";
import { SEO, HomePageStructuredData } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { KPISection } from "@/components/home/KPISection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { DataVisualization } from "@/components/home/DataVisualization";
import { StormResponse } from "@/components/home/StormResponse";
import { CalculatorTeaser } from "@/components/home/CalculatorTeaser";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { ClientLogos } from "@/components/home/ClientLogos";
import { CTABanner } from "@/components/home/CTABanner";

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Commercial Roof Consulting for Institutional Investors"
        description="Southern Roof Consultants protects over $3 billion in commercial roofing assets. Expert inspections, construction management, and portfolio intelligence for REITs and property managers."
        keywords="commercial roof inspection, due diligence inspection, REIT roof management, commercial roofing consultant, roof asset management"
      />
      <HomePageStructuredData />
      <Hero />
      <KPISection />
      <ClientLogos />
      <Testimonials />
      <ServicesOverview />
      <DataVisualization />
      <StormResponse />
      <CalculatorTeaser />
      <BlogPreview />
      <CTABanner />
    </Layout>
  );
};

export default Index;
