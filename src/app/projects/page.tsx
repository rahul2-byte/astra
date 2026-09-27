import type { Metadata } from "next";
import { ReferencePage } from "@/components/reference-page";

export const metadata: Metadata = {
  title: "Projects",
  description: "Independent projects in financial research, model fine-tuning, and recommendation systems, with implementation details and evaluation.",
};

export default function ProjectsPage() {
  return <ReferencePage name="projects" />;
}
