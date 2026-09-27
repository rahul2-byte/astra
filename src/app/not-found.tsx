import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex w-full flex-1 items-center bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-label-mono text-label-mono text-primary">404 | Page not found</p>
        <h1 className="font-headline-xl text-headline-xl text-text-primary">This page isn’t here.</h1>
        <p className="font-body-lg text-body-lg text-text-secondary">That link may be old. Return home or browse the projects.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link className="rounded-lg bg-text-primary px-4 py-2.5 font-body-sm text-body-sm font-medium text-surface" href="/">Return home</Link>
          <Link className="font-body-sm text-body-sm font-medium text-primary" href="/projects">Browse projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
