import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "Movie Recommendation System | Rahul Singh",
  description: "Recommendation system case study for Rahul Singh's ML portfolio.",
};

export default function MovieRecommendationCaseStudy() {
  return <CaseStudyPage study={caseStudies["movie-recommendation-system"]} />;
}
