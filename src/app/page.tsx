import type { Metadata } from "next";
import { HomeSections } from "@/components/home-sections";

const title = "Rahul Singh — Machine Learning Engineer | Applied AI | LLM/RAG Systems";
const description =
  "Machine Learning Engineer with 4+ years of production experience building telemetry analytics, detection systems, recommendation systems, and applied AI workflows.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function Home() {
  return <HomeSections />;
}
