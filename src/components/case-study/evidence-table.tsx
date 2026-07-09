export type EvidenceTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string>[];
  source: string;
};

export function EvidenceTable({ title, columns, rows, source }: EvidenceTableProps) {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="sticky top-0 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-600"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/40" : "bg-transparent"}>
                {columns.map((column) => (
                  <td key={column} className="border-t border-slate-200/70 px-4 py-3 align-top text-slate-700">
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
