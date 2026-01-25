import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { MissionValues } from "@/components/about/MissionValues";
import { KPISection } from "@/components/home/KPISection";
import { MeetTheTeam } from "@/components/about/MeetTheTeam";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { CTABanner } from "@/components/home/CTABanner";

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About Southern Roof Consultants"
        description="Learn about our mission, history, and the experienced team protecting over $3 billion in commercial roofing assets for institutional investors nationwide."
        keywords="about Southern Roof Consultants, commercial roof consulting company, roof inspection team"
      />
      <AboutHero />
      <OurStory />
      <MissionValues />
      <KPISection />
      <MeetTheTeam />
      <WhyChooseUs />
      <CTABanner />
    </Layout>
  );
}
