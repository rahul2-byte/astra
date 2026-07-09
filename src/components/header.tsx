import Link from "next/link";
import { navItems, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b soft-divider bg-[#f7f3ea]/86 backdrop-blur-xl">
      <nav className="section-shell flex items-center justify-between gap-6 py-4" aria-label="Main navigation">
        <Link className="text-xl font-bold tracking-tight text-slate-800" href="/">
          {site.name}
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-slate-900 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="border-b border-transparent px-1 pb-4 pt-3 hover:border-[#4f7fb8] hover:text-[#4f7fb8]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
