import type { Metadata } from "next";
import FreelancingPageClient from "./FreelancingPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/freelancing",
  title: "Freelancing Services | Mehedi Hasan",
  description:
    "Freelance frontend and Next.js development services with transparent scope, pricing, and delivery flow.",
  keywords: ["freelance Next.js developer", "frontend freelancing services", "React freelance"],
});

export default function FreelancingPage() {
  return <FreelancingPageClient />;
}
