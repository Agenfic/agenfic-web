import type { Metadata } from "next";
import PumpEfficiencyCalculator from "@/components/pump-efficiency-calculator";

export const metadata: Metadata = {
  title: "Pump Efficiency Calculator | Agenfic",
  description:
    "Calculate pump efficiency from flow, head, and electrical telemetry without leaving the dashboard workspace."
};

export default function PumpEfficiencyCalculatorPage() {
  return <PumpEfficiencyCalculator />;
}
