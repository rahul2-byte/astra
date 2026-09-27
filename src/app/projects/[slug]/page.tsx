import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferencePage, type ReferencePageName } from "@/components/reference-page";
import { getProject, projects } from "@/content/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const referenceNameBySlug: Record<string, ReferencePageName> = {
    "fin-ai": "fin-ai",
    "lora-reproduction": "lora",
    "movie-recommendation-system": "movie",
  };
  const referenceName = referenceNameBySlug[slug];
  if (!referenceName) notFound();

  return <ReferencePage name={referenceName} />;
}
