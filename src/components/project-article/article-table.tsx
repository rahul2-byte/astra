type ArticleTableProps = {
  title: string;
  caption: string;
  columns: string[];
  rows: Record<string, string>[];
};

export function ArticleTable({ title, caption, columns, rows }: ArticleTableProps) {
  return (
    <section className="surface-card my-8 p-5 md:p-6" aria-labelledby={`${title}-title`}>
      <h3 id={`${title}-title`} className="font-display text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{caption}</p>
      <div className="mt-5 overflow-x-auto" tabIndex={0} aria-label={`${title} table`}>
        <table className="w-full min-w-[42rem] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="border-y border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className={index % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--surface-elevated)]/50"}>
                {columns.map((column) => <td key={column} className="border-b border-[var(--border)] px-4 py-3 align-top leading-6 text-[var(--muted)]">{row[column]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
