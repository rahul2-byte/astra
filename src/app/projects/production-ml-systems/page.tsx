import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "Production ML Systems | Rahul Singh",
  description: "High-level production ML case study based on Rahul Singh's Intangles experience.",
};

export default function ProductionMlCaseStudy() {
  return <CaseStudyPage study={caseStudies["production-ml-systems"]} />;
}
