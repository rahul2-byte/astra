import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="shell not-found">
      <p className="not-found-label">404 | Page not found</p>
      <h1>This page isn’t here.</h1>
      <p>That link may be old. Return home or browse the projects.</p>
      <div className="not-found-actions">
        <Link className="resume-link" href="/">Return home</Link>
        <Link className="text-link" href="/projects">Browse projects <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
