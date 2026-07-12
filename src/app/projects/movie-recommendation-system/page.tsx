import { ProjectArticleLayout } from "@/components/project-article/project-article-layout";
import { movieRecommendationCaseStudy } from "@/content/movie-recommendation-case-study";

export const metadata = {
  title: "Movie Recommendation System | Rahul Singh",
  description: "Technical case study: multi-retriever movie recommendation, runtime features, and LightGBM reranking.",
};

export default function MovieRecommendationCaseStudy() {
  return <ProjectArticleLayout study={movieRecommendationCaseStudy} />;
}
