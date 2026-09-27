const paths = ["M2 26 L24 26 L29 5 L34 26 L76 26", "M2 20 C12 4 18 35 28 18 S44 30 54 14 S66 25 76 12", "M2 25 C20 24 25 22 38 19 S58 14 76 12", "M2 8 L20 8 L24 28 L48 28 C58 28 62 24 76 24", "M2 20 C8 20 8 7 14 7 S20 20 26 20 S32 7 38 7 S44 20 50 20 S56 7 62 7 S68 20 76 20", "M2 30 C18 30 20 28 26 22 C32 14 36 4 40 4 C44 4 48 14 54 22 C60 28 62 30 78 30"];
export function TelemetryTrace({ index, chart = false }: { index: number; chart?: boolean }) {
  return <svg className={chart ? "ambient-chart" : "ambient-trace"} viewBox="0 0 80 34" aria-hidden="true"><path d={paths[index % paths.length]} /></svg>;
}
