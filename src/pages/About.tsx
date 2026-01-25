import { Layout } from "@/components/layout/Layout";
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
