import { render, screen } from "@testing-library/react";
import { Activity, Cpu, Gauge } from "lucide-react";
import { ComparisonBars } from "@/components/case-study/comparison-bars";
import { MetricTile } from "@/components/case-study/metric-tile";
import { StackPill } from "@/components/case-study/stack-pill";

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
        icon={Gauge}
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
        icon={Activity}
        spark={[1, 2, 3, 2, 4, 5]}
      />,
    );
    expect(container.querySelector("svg polyline")).not.toBeNull();
  });

  it("renders different icons based on the icon prop", () => {
    render(<MetricTile value="4" label="agents" source="Project artifact" icon={Cpu} />);
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
