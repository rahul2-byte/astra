export const experience = {
  dates: "April 2022 – Present",
  outcomes: [
    { value: "15%", label: "fewer false-positive fuel alerts after smoothing" },
    { value: "±2%", label: "refill-volume estimates versus entered logs" },
  ],
  workstreams: [
    {
      title: "Fuel event detection",
      detail:
        "Improved fuel-event analytics with signal smoothing, reducing false-positive alerts by 15%. Refill-volume estimates were within ±2% of entered logs.",
      tools: ["Signal processing"],
    },
    {
      title: "Vehicle-tag recommendations",
      detail:
        "Built an internal tool that suggests vehicle tags from similar examples, reducing manual tagging effort and helping new teammates get started.",
      tools: ["Search & recommendations"],
    },
    {
      title: "EV coolant estimates",
      detail:
        "Collaborated on a team model for coolant-temperature estimates and health-state forecasts from vehicle sensor data. Added checks for incomplete inputs to help prevent unreliable estimates.",
      tools: ["Time-series ML", "Input validation"],
    },
  ],
};
