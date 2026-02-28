"use client";

import { useRef } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/site-data";
import { useRevealHeader } from "@/app/hooks/useRevealHeader";
import ProjectShowcaseCard from "@/app/features/projects/ProjectShowcaseCard";
import { usePortfolioState } from "./usePortfolioState";

type PortfolioPageClientProps = {
  projects: Project[];
  initialSearchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
};

export default function PortfolioPageClient({
  projects,
  initialSearchParams,
}: PortfolioPageClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useRevealHeader(headerRef);

  const {
    query,
    filters,
    activeFilter,
    filteredProjects,
    paginatedProjects,
    totalPages,
    activePage,
    pageNumbers,
    start,
    changeFilter,
    changePage,
    changeQuery,
    clearQuery,
  } = usePortfolioState({ projects, initialSearchParams });

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen overflow-hidden py-[clamp(4rem,8vw,8rem)]"
      style={{ background: "var(--bg)" }}
    >
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        <div ref={headerRef} className="mb-10 overflow-hidden text-center">
          <h2 className="sectionTitleGlobal">
            All <span style={{ color: "var(--accent)" }}>PROJECTS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            I&apos;ve developed commercial projects as well as hobby projects. All projects are
            included here. Check out my{" "}
            <Link
              href="/blog"
              className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80"
            >
              blog
            </Link>{" "}
            while you&apos;re here.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 min-[769px]:mb-10 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
          <div className="relative w-full min-[769px]:max-w-[520px]">
            <label htmlFor="portfolio-search" className="sr-only">
              Search projects
            </label>
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] text-[var(--text-secondary)]"
              aria-hidden="true"
            />
            <input
              id="portfolio-search"
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Search by title, description, or tech..."
              className="h-12 w-full rounded-[14px] border border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.08)] pl-11 pr-11 text-[0.95rem] text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:bg-[rgba(var(--accent-rgb),0.12)]"
            />
            {query ? (
              <button
                type="button"
                onClick={clearQuery}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[rgba(var(--accent-rgb),0.2)] hover:text-[var(--text)]"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            ) : null}
          </div>

          <p className="text-[0.9rem] text-[var(--text-secondary)]">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 min-[769px]:mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => changeFilter(filter)}
              className={`inline-flex items-center rounded-[999px] border px-4 py-2 font-['Staatliches',serif] text-[0.85rem] tracking-[0.08em] transition-colors duration-200 ${
                activeFilter === filter
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]"
                  : "border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.06)] text-[var(--text)] hover:bg-[rgba(6,182,212,0.12)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {paginatedProjects.length === 0 ? (
          <div className="mb-[clamp(2rem,4vw,4rem)] rounded-[20px] border border-[rgba(var(--accent-rgb),0.2)] bg-[rgba(var(--accent-rgb),0.06)] p-8 text-center">
            <p className="mb-4 text-[var(--text-secondary)]">
              No projects matched <span className="text-[var(--text)]">&quot;{query}&quot;</span>.
            </p>
            <button
              type="button"
              onClick={clearQuery}
              className="rounded-[999px] border border-[var(--accent)] px-4 py-2 font-['Staatliches',serif] text-[0.9rem] tracking-[0.08em] text-[var(--accent)] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            >
              CLEAR SEARCH
            </button>
          </div>
        ) : (
          <div className="mb-[clamp(2rem,4vw,4rem)] grid grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] max-[1024px]:grid-cols-2 max-[1024px]:gap-[clamp(1rem,2vw,1.25rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(0.875rem,2vw,1.25rem)] max-[480px]:grid-cols-1 max-[480px]:gap-[clamp(0.875rem,2vw,1.25rem)]">
            {paginatedProjects.map((project, index) => (
              <ProjectShowcaseCard
                key={project.id}
                project={project}
                index={start + index}
              />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mb-[clamp(2rem,4vw,4rem)] flex flex-wrap items-center justify-center gap-2"
            aria-label="Portfolio pagination"
          >
            <button
              type="button"
              onClick={() => changePage(Math.max(1, activePage - 1))}
              disabled={activePage === 1}
              className="inline-flex h-10 items-center gap-2 rounded-[999px] border border-[rgba(6,182,212,0.35)] px-4 text-[0.85rem] font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[rgba(6,182,212,0.12)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <FiChevronLeft size={16} /> Prev
            </button>

            {pageNumbers.map((pageNumber, index) =>
              pageNumber === -1 ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-10 w-10 items-center justify-center text-[var(--text-secondary)]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => changePage(pageNumber)}
                  aria-current={activePage === pageNumber ? "page" : undefined}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[0.88rem] font-semibold transition-colors duration-200 ${
                    activePage === pageNumber
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]"
                      : "border-[rgba(6,182,212,0.35)] text-[var(--text)] hover:bg-[rgba(6,182,212,0.12)]"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => changePage(Math.min(totalPages, activePage + 1))}
              disabled={activePage === totalPages}
              className="inline-flex h-10 items-center gap-2 rounded-[999px] border border-[rgba(6,182,212,0.35)] px-4 text-[0.85rem] font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[rgba(6,182,212,0.12)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next <FiChevronRight size={16} />
            </button>
          </nav>
        ) : null}

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/mehedi-hasan1102"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaGithub size={16} />
            <span>MORE PROJECTS</span>
          </a>
        </div>
      </div>
    </section>
  );
}
