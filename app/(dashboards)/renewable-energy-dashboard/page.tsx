import type { Metadata } from "next";
import RenewableEnergyDashboard from "@/components/renewable-energy-dashboard";

export const metadata: Metadata = {
  title: "Renewable Energy Dashboard | Agenfic",
  description: "Live renewable energy dashboard with interactive power graph"
};

export default function RenewableEnergyDashboardPage() {
  return <RenewableEnergyDashboard />;
}
