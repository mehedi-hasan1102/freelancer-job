import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { createPageMetadata } from "@/lib/seo";
import { getExperienceItems } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/about",
  title: "About Me | Mehedi Hasan",
  description:
    "Learn about Mehedi Hasan's background, technical stack, and hands-on experience building modern web products.",
  keywords: ["About Mehedi Hasan", "web developer background", "developer experience"],
});

export default function AboutPage() {
  const experiences = getExperienceItems();

  return <AboutPageClient experiences={experiences} />;
}
