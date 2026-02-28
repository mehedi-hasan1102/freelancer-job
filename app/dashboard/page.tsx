import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { createPageMetadata } from "@/lib/seo";

const DeveloperDashboard = dynamic(() => import("../components/DeveloperDashboard"), {
  loading: () => (
    <section
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
      aria-label="Loading dashboard"
    />
  ),
});

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
