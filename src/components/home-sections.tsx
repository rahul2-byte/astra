import { ContactCta } from "@/components/home/contact-cta";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { ExpertiseGrid } from "@/components/home/expertise-grid";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeHero } from "@/components/home/home-hero";
import { ProfessionalSnapshot } from "@/components/home/professional-snapshot";
import { ResumeCallout } from "@/components/home/resume-callout";
import { SectionReveal } from "@/components/motion/section-reveal";

export function HomeSections() {
  return (
    <main className="overflow-hidden">
      <HomeHero />
      <SectionReveal><ProfessionalSnapshot /></SectionReveal>
      <SectionReveal><ExpertiseGrid /></SectionReveal>
      <SectionReveal><FeaturedProjects /></SectionReveal>
      <SectionReveal><ExperiencePreview /></SectionReveal>
      <SectionReveal><ResumeCallout /></SectionReveal>
      <SectionReveal><ContactCta /></SectionReveal>
    </main>
  );
}
