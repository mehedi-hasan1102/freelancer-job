import type { Metadata } from "next";
import PortfolioPageClient from "@/app/features/portfolio/PortfolioPageClient";
import { createPageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/portfolio",
  title: "Portfolio Projects | Mehedi Hasan",
  description:
    "Explore full-stack and frontend projects by Mehedi Hasan, including case studies, technologies, and live demos.",
  keywords: ["web development portfolio", "Next.js projects", "frontend case studies"],
});

type PortfolioPageProps = {
  searchParams: Promise<{
    q?: string;
    filter?: string;
    page?: string;
  }>;
};

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams;
  const projects = getProjects();

  return <PortfolioPageClient projects={projects} initialSearchParams={params} />;
}
