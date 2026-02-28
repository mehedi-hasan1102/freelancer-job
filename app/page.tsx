import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import DiagonalMarquee from "./components/DiagonalMarquee";
import WhatIDo from "./components/WhatIDo";
import LatestBlogs from "./components/LatestBlogs";
import TrustSection from "./components/TrustSection";
import { createPageMetadata } from "@/lib/seo";
import {
  getCertificates,
  getExperienceItems,
  getSelectedProjects,
} from "@/lib/site-data";

const Recognition = dynamic(() => import("./components/Recognition"), {
  loading: () => (
    <section
      className="min-h-[40vh]"
      style={{ background: "var(--bg)" }}
      aria-label="Loading recognition section"
    />
  ),
});

const GitHubActivity = dynamic(() => import("./components/GitHubActivity"), {
  loading: () => (
    <section
      className="min-h-[40vh]"
      style={{ background: "var(--bg)" }}
      aria-label="Loading GitHub activity section"
    />
  ),
});

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
  const experiences = getExperienceItems();
  const certificates = getCertificates();

  return (
    <SmoothScroll>
      <main>
        <Hero />
        <DiagonalMarquee />
        <About />
        <Skills />
        <WhatIDo />
        <Projects projects={selectedProjects} />
        <TrustSection />
        <Experience experiences={experiences} limit={3} showViewAllButton />
        <LatestBlogs />
        <Recognition certificates={certificates} />
        <GitHubActivity />
      </main>
    </SmoothScroll>
  );
}
