import type { Metadata } from "next";
import { HomeSections } from "@/components/home-sections";

const title = "Rahul Singh — Machine Learning Engineer | Production ML & Applied AI";
const description =
  "Machine Learning Engineer with 4+ years of production experience building telemetry analytics, detection systems, RAG workflows, recommendation systems, and ML APIs.";

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
