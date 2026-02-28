import type { Metadata } from "next";
import LinksPageClient from "./LinksPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/links",
  title: "Social & Professional Links | Mehedi Hasan",
  description:
    "Find Mehedi Hasan across GitHub, LinkedIn, YouTube, and developer platforms.",
  keywords: ["Mehedi Hasan links", "developer social profiles", "GitHub LinkedIn portfolio"],
});

export default function LinksPage() {
  return <LinksPageClient />;
}
