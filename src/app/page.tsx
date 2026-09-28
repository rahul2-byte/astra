import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} | Applied AI / Machine Learning Engineer at Intangles`,
  description: site.summary,
  openGraph: {
    title: `${site.name} | Applied AI / Machine Learning Engineer at Intangles`,
    description: site.summary,
  },
};

export default function Home() {
  return <HomePage />;
}
