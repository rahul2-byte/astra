import { render, screen } from "@testing-library/react";
import { ComparisonBars } from "@/components/case-study/comparison-bars";
import { MetricTile } from "@/components/case-study/metric-tile";
import { StackPill } from "@/components/case-study/stack-pill";
import { TrendLine } from "@/components/case-study/trend-line";
import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { EvidenceTable } from "@/components/case-study/evidence-table";

describe("StackPill", () => {
  it("renders the stack label inside a rounded chip", () => {
    render(<StackPill>FastAPI</StackPill>);
    const pill = screen.getByText("FastAPI");
    expect(pill).toBeInTheDocument();
    expect(pill.className).toMatch(/rounded/);
    expect(pill.className).toMatch(/border/);
  });
});

describe("MetricTile", () => {
  it("renders the value, label, and source", () => {
    render(
      <MetricTile
        value="95%"
        label="Alert accuracy maintained"
        source="Resume"
        iconName="Gauge"
      />,
    );
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(screen.getByText(/alert accuracy maintained/i)).toBeInTheDocument();
    expect(screen.getByText(/resume/i)).toBeInTheDocument();
  });

  it("renders an optional sparkline when spark points are provided", () => {
    const { container } = render(
      <MetricTile
        value="120ms"
        label="p95 latency"
        source="Project artifact"
        iconName="Activity"
        spark={[1, 2, 3, 2, 4, 5]}
      />,
    );
    expect(container.querySelector("svg polyline")).not.toBeNull();
  });

  it("renders different icons based on the icon prop", () => {
    render(<MetricTile value="4" label="agents" source="Project artifact" iconName="Cpu" />);
    expect(screen.getByLabelText("metric icon")).toBeInTheDocument();
  });
});

describe("ComparisonBars", () => {
  it("renders the before and after labels, units, and delta", () => {
    render(
      <ComparisonBars
        title="Support queries per day"
        before={{ label: "Before", value: 6, unit: "queries/day" }}
        after={{ label: "After", value: 2, unit: "queries/day" }}
        delta="−4 queries/day"
        source="Resume"
      />,
    );
    expect(screen.getByText(/support queries per day/i)).toBeInTheDocument();
    expect(screen.getByText(/before/i)).toBeInTheDocument();
    expect(screen.getByText(/after/i)).toBeInTheDocument();
    expect(screen.getByText(/−4 queries\/day/i)).toBeInTheDocument();
    expect(screen.getAllByText(/queries\/day/i).length).toBeGreaterThanOrEqual(2);
  });
});

describe("TrendLine", () => {
  it("renders the title, axis labels, and one dot per data point", () => {
    const { container } = render(
      <TrendLine
        title="Precision@10 over training iterations"
        yLabel="Precision@10"
        xLabel="Iteration"
        source="Project artifact"
        points={[
          { iteration: 1, metric: 0.18 },
          { iteration: 2, metric: 0.24 },
          { iteration: 3, metric: 0.31 },
        ]}
      />,
    );
    expect(screen.getByText(/precision@10 over training iterations/i)).toBeInTheDocument();
    expect(screen.getAllByText(/iteration/i).length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll("svg circle").length).toBe(3);
  });
});

describe("ArchitectureFlow", () => {
  it("renders every node label, caption, and the caption line", () => {
    render(
      <ArchitectureFlow
        caption="A → B → C"
        nodes={[
          { key: "a", label: "A", iconName: "Network", caption: "first" },
          { key: "b", label: "B", iconName: "Database", caption: "second" },
          { key: "c", label: "C", iconName: "Network", caption: "third" },
        ]}
      />,
    );
    expect(screen.getByText(/a → b → c/i)).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText(/first/i)).toBeInTheDocument();
    expect(screen.getByText(/second/i)).toBeInTheDocument();
    expect(screen.getByText(/third/i)).toBeInTheDocument();
  });
});

describe("EvidenceTable", () => {
  it("renders the title, headers, and one row per evidence entry", () => {
    render(
      <EvidenceTable
        title="Signal → outcome"
        columns={["Signal", "Method", "Outcome"]}
        rows={[
          { Signal: "Fuel", Method: "SMA", Outcome: "Stable" },
          { Signal: "GPS", Method: "Gap check", Outcome: "Detected" },
        ]}
        source="Resume"
      />,
    );
    expect(screen.getByText(/signal → outcome/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /signal/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /method/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /outcome/i })).toBeInTheDocument();
    expect(screen.getByText("Fuel")).toBeInTheDocument();
    expect(screen.getByText("GPS")).toBeInTheDocument();
  });
});
