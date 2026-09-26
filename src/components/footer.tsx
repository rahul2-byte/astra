import { site } from "@/content/site";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <nav aria-label="Contact and social links">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.phoneHref}>Phone</a>
        </nav>
      </div>
    </footer>
  );
}
