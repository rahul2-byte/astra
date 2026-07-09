import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t soft-divider bg-[#f7f3ea]/86 backdrop-blur-xl">
      <div className="section-shell flex flex-col gap-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Built as Rahul Singh&apos;s ML portfolio.</p>
        <div className="flex gap-5">
          <Link href="/writing">Writing</Link>
          <a href={site.github}>GitHub</a>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
