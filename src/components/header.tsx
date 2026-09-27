import Link from "next/link";
import { siGithub } from "simple-icons";
import { site } from "@/content/site";
import { BrandIcon, DownloadIcon, LinkedInIcon } from "@/components/brand-icon";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Rahul Singh home"><span>RS</span>Rahul Singh</Link>
        <p className="header-status"><span aria-hidden="true" />Intangles · Available for ML</p>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#about">About</Link><Link href="/#experience">Experience</Link><Link href="/#skills">Skills</Link><Link href="/#projects">Projects</Link><Link href="/#contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <a className="header-resume" href={site.resume} download="Rahul-Singh-Resume.pdf"><DownloadIcon className="icon" />Résumé</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BrandIcon className="icon" icon={siGithub} /></a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon className="icon" /></a>
        </div>
      </div>
    </header>
  );
}
