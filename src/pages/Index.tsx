import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { KPISection } from "@/components/home/KPISection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CalculatorTeaser } from "@/components/home/CalculatorTeaser";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { ClientLogos } from "@/components/home/ClientLogos";
import { CTABanner } from "@/components/home/CTABanner";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <KPISection />
      <ServicesOverview />
      <CalculatorTeaser />
      <BlogPreview />
      <Testimonials />
      <ClientLogos />
      <CTABanner />
    </Layout>
  );
};

export default Index;
