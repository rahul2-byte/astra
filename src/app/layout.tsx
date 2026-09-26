import type { Metadata, Viewport } from "next";
import { Calistoga, Inter } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Calistoga({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.summary,
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.summary,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
