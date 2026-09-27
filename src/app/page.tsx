import type { Metadata } from "next";
import { ReferencePage } from "@/components/reference-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} | Machine Learning Engineer at Intangles`,
  description: site.summary,
  openGraph: {
    title: `${site.name} | Machine Learning Engineer at Intangles`,
    description: site.summary,
  },
};

export default function Home() {
  return <ReferencePage name="home" />;
}
