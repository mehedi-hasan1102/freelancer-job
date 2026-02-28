import type { Metadata } from "next";
import DeveloperDashboard from "../components/DeveloperDashboard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/dashboard",
  title: "Developer Dashboard | Mehedi Hasan",
  description:
    "Live developer dashboard with GitHub activity, repository highlights, and coding stats.",
  keywords: ["developer dashboard", "GitHub portfolio", "coding activity"],
});

export default function Dashboard() {
  return <DeveloperDashboard />;
}
