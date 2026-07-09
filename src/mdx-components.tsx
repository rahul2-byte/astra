import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950">
        {children}
      </h2>
    ),
    p: ({ children }) => <p className="mt-4 leading-8 text-slate-700">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
    ),
    ...components,
  };
}
