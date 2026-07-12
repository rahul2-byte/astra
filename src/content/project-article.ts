export type ArticleResource = {
  label: string;
  href: string;
  description: string;
  external?: boolean;
};

export type ArticleTable = {
  title: string;
  caption: string;
  columns: string[];
  rows: Record<string, string>[];
};

export type FlowLane = {
  label: string;
  steps: { title: string; detail: string }[];
};

export type ArticleSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  evidence?: string;
  callout?: { title: string; body: string };
};

export type ProjectArticleCaseStudy = {
  meta: {
    title: string;
    summary: string;
    category: string;
    role: string;
    duration: string;
    status: string;
    stack: string[];
    resourcesTitle?: string;
  };
  toc: { id: string; label: string }[];
  resources: ArticleResource[];
  facts: { value: string; label: string }[];
  sections: ArticleSection[];
  systemOverview: ArticleSection;
  workflow: ArticleSection;
  flows: { title: string; caption: string; lanes: FlowLane[] }[];
  tables: {
    api: ArticleTable;
    decisions: ArticleTable;
    skills: ArticleTable;
    agents?: ArticleTable;
  };
};
