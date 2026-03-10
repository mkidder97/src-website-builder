import { Layout } from "@/components/layout/Layout";
import { SEO, HomePageStructuredData } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { AuthorityStrip } from "@/components/home/AuthorityStrip";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PlatformTeaser } from "@/components/home/PlatformTeaser";
import { CalculatorTeaser } from "@/components/home/CalculatorTeaser";
import { StormResponse } from "@/components/home/StormResponse";
import { CTABanner } from "@/components/home/CTABanner";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Commercial Roof Consulting for Institutional Investors"
        description="Southern Roof Consultants protects over $3B in commercial roofing assets for REITs and institutional property owners across 28 states. Data-driven inspections. Trusted expertise."
        keywords="commercial roof inspection, due diligence inspection, REIT roof management, commercial roofing consultant, roof asset management"
      />
      <HomePageStructuredData />
      <Hero />
      <AuthorityStrip />
      <ClientLogos />
      <Testimonials />
      <FeaturedProjects />
      <ServicesOverview />
      <PlatformTeaser />
      <CalculatorTeaser />
      <StormResponse />
      <CTABanner />
    </Layout>
  );
};

export default Index;
