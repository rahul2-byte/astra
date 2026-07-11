export type EvidenceTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string>[];
  source: string;
};

export function EvidenceTable({ title, columns, rows, source }: EvidenceTableProps) {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">{title}</h3>
        <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{source}</span>
      </div>
      <div className="mt-4 overflow-x-auto" tabIndex={0} aria-label={`${title} evidence table`}>
        <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="sticky top-0 bg-[var(--surface-elevated)] px-4 py-3 font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--surface-elevated)]/50"}>
                {columns.map((column) => (
                  <td key={column} className="border-t border-[var(--border)] px-4 py-3 align-top text-[var(--muted)]">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
