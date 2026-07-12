import { ProjectArticleLayout } from "@/components/project-article/project-article-layout";
import { productionMlCaseStudy } from "@/content/production-ml-case-study";

export const metadata = {
  title: "Production ML Systems | Rahul Singh",
  description: "Public-safe technical case study of production OBD telemetry and fuel-event detection work at Intangles.",
};

export default function ProductionMlCaseStudy() {
  return <ProjectArticleLayout study={productionMlCaseStudy} />;
}
