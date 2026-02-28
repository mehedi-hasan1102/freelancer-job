"use client";

import { useRef } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/lib/site-data";
import { useRevealHeader } from "@/app/hooks/useRevealHeader";
import ProjectShowcaseCard from "@/app/features/projects/ProjectShowcaseCard";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useRevealHeader(headerRef);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen overflow-hidden py-[clamp(4rem,8vw,8rem)]"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        <div
          ref={headerRef}
          className="mb-[clamp(2.5rem,5vw,5rem)] overflow-hidden text-center"
        >
          <h2 className="sectionTitleGlobal">
            Selected <span style={{ color: "var(--accent)" }}>PROJECTS</span>
          </h2>
        </div>

        <div className="mb-[clamp(2rem,4vw,4rem)] grid grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] max-[1024px]:grid-cols-2 max-[1024px]:gap-[clamp(1rem,2vw,1.25rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(0.875rem,2vw,1.25rem)] max-[480px]:grid-cols-1 max-[480px]:gap-[clamp(0.875rem,2vw,1.25rem)]">
          {projects.map((project, index) => (
            <ProjectShowcaseCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/portfolio" className="btn-primary">
            <FiArrowUpRight size={16} />
            <span>VIEW ALL PROJECTS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
