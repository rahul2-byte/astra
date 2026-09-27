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
        "Reduced false-positive fuel alerts by 15% with signal smoothing. Refill-volume estimates were within ±2% of entered logs.",
      tools: ["Signal processing"],
    },
    {
      title: "Vehicle-tag recommendations",
      detail:
        "Built an internal tool that recommends vehicle tags from similar examples, reducing manual tagging and helping new teammates ramp up.",
      tools: ["Search & recommendations"],
    },
    {
      title: "EV coolant estimates",
      detail:
        "Collaborated on a team model that estimates coolant temperature and forecasts health states from vehicle sensor data. Added checks for incomplete inputs to reduce the risk of unreliable estimates.",
      tools: ["Time-series ML", "Input validation"],
    },
  ],
};
