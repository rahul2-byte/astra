export const experience = {
  dates: "April 2022 - Present",
  workstreams: [
    {
      title: "Fuel event detection",
      detail: "I added checks for small fuel events and missing OBD signals, then smoothed noisy readings. This reduced false-positive alerts by 15%. Refill estimates were within ±2% of customer-entered filling logs.",
    },
    {
      title: "Vehicle-tag suggestions",
      detail: "I built an internal tool that suggests algorithm-specific vehicle tags for review. It retrieves similar examples, ranks suggestions by confidence, and checks the output. I can’t share employer data or decision thresholds.",
    },
    {
      title: "EV coolant estimates",
      detail: "I worked with a team on an LSTM model that estimates coolant temperature and reports current and forecast health states from irregular EV telemetry. I prepared the inputs and added checks for missing data and physical bounds, with deterministic fallbacks when inputs weren’t reliable.",
    },
  ],
};
