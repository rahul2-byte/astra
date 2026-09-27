import { siGithub } from "simple-icons";
import { site } from "@/content/site";
import { BrandIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/brand-icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} {site.name}<span>·</span>⌖ {site.location}</p>
        <nav aria-label="Contact and social links">
          <a href={`mailto:${site.email}`}><MailIcon className="icon" />Email</a>
          <a href={site.phoneHref}><PhoneIcon className="icon" />{site.phone}</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer"><BrandIcon className="icon" icon={siGithub} />GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon className="icon" />LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
