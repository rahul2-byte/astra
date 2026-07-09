import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "FIN-AI | Rahul Singh",
  description: "Multi-agent financial intelligence platform case study for Rahul Singh's portfolio.",
};

export default function FinAiCaseStudy() {
  return <CaseStudyPage study={caseStudies["fin-ai"]} />;
}
