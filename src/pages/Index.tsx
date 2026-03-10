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
import { VideoShowcase } from "@/components/shared/VideoShowcase";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

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
      <VideoShowcase
        title="Protecting Commercial Roofing Assets Nationwide"
        description="See how our team delivers institutional-grade inspections and construction management for some of the nation's largest REITs and property managers."
        placeholderSubtitle="Company overview coming soon"
        iframeTitle="Southern Roof Consultants Company Overview"
      />
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
