import { TelemetryTrace } from "./TelemetryTrace";

export function LineChartGhost({ index }: { index: number }) {
  return <TelemetryTrace index={index + 1} chart />;
}
