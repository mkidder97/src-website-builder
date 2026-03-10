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
        title="About Southern Roof Consultants | 23 Years of Commercial Roof Expertise"
        description="Founded in 2002, SRC has grown into the trusted partner for the nation's largest REITs and institutional investors. Learn about our team and mission."
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
