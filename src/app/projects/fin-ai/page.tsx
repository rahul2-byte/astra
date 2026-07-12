import { ProjectArticleLayout } from "@/components/project-article/project-article-layout";
import { finAiCaseStudy } from "@/content/fin-ai-case-study";

export const metadata = {
  title: "FIN-AI | Rahul Singh",
  description: "Technical case study: a local-first multi-agent financial research assistant for Indian-market questions.",
};

export default function FinAiCaseStudy() {
  return <ProjectArticleLayout study={finAiCaseStudy} />;
}
