import type { Metadata } from "next";
import ConstructionRedirectPage from "@/components/construction-redirect-page";

export const metadata: Metadata = {
  title: "Under Construction | Agenfic",
  description: "Agenfic page under construction"
};

export default function UnderConstructionPage() {
  return <ConstructionRedirectPage />;
}
