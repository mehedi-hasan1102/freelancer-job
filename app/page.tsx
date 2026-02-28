import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import DiagonalMarquee from "./components/DiagonalMarquee";
import WhatIDo from "./components/WhatIDo";
import TrustSection from "./components/TrustSection";
import { createPageMetadata } from "@/lib/seo";
import { getSelectedProjects } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/",
  title: "Mehedi Hasan | Full-Stack Developer & Web Engineer",
  description:
    "Portfolio of Mehedi Hasan featuring full-stack projects, experience, and recognition in modern web development.",
  keywords: [
    "Mehedi Hasan",
    "Full-Stack Developer",
    "Next.js developer",
    "React portfolio",
  ],
});

export default function Home() {
  const selectedProjects = getSelectedProjects();

  return (
    <SmoothScroll>
      <main>
        <Hero />
        <DiagonalMarquee />
        <WhatIDo />
        <Projects projects={selectedProjects} />
        <TrustSection />
      </main>
    </SmoothScroll>
  );
}
