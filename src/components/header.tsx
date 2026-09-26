import Link from "next/link";
import { navItems } from "@/content/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
