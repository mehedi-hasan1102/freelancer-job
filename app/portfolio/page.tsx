"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiSearch, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  year: string;
}

const PROJECTS_PER_PAGE = 6;

const getPageNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, -1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      -1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }, 0);

        tl.to(content, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0.2);
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full no-underline">
      <div
        ref={cardRef}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
        />
        <span className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
          <FiExternalLink size={18} />
        </span>
        
        {/* Project Image */}
        <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[linear-gradient(135deg,rgba(6,182,212,0.05),rgba(6,182,212,0.02))] max-[1024px]:h-[clamp(120px,25vw,150px)] max-[768px]:h-[clamp(100px,20vw,150px)] max-[480px]:h-[clamp(80px,40vw,120px)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="h-full w-full object-cover object-center transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        
        <div
          ref={contentRef}
          className="relative z-[2] flex flex-1 flex-col justify-between bg-[var(--card-bg,transparent)] p-8 max-[1024px]:p-[clamp(1.25rem,3vw,1.5rem)] max-[768px]:p-[clamp(1rem,2.5vw,1.5rem)] max-[480px]:p-[clamp(0.875rem,2vw,1.5rem)]"
        >
          <div className="mb-3 flex items-start gap-4 max-[768px]:flex-col max-[768px]:gap-[clamp(0.5rem,1vw,1rem)]">
            <span className="min-w-[80px] font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(6,182,212,0.08)] max-[1024px]:text-[clamp(1.5rem,4vw,2rem)] max-[768px]:min-w-[clamp(50px,10vw,80px)] max-[768px]:text-[clamp(1.25rem,3.5vw,2rem)] max-[480px]:min-w-[clamp(45px,8vw,60px)] max-[480px]:text-[clamp(1rem,3vw,1.5rem)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="flex-1 font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[1024px]:text-[clamp(1rem,2.5vw,1.25rem)] max-[768px]:text-[clamp(0.9rem,2vw,1.25rem)] max-[480px]:text-[clamp(0.8rem,1.8vw,1rem)]">
              {project.title}
            </h3>
          </div>
          <p className="mb-2 font-['Inter',sans-serif] text-[0.875rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            {project.category}
          </p>
         <p className="mb-6 flex-1 font-['Inter',sans-serif] text-[0.875rem] leading-[1.5] text-[var(--text-secondary)] max-[1024px]:text-[clamp(0.75rem,1.2vw,0.875rem)] max-[768px]:mb-[clamp(0.75rem,1.5vw,1.5rem)] max-[768px]:text-[clamp(0.7rem,1vw,0.875rem)] max-[480px]:text-[clamp(0.65rem,0.9vw,0.75rem)]">
  {project.description.length > 100
    ? project.description.slice(0, 100) + '...'
    : project.description}
</p>
          <div className="mt-auto flex flex-wrap gap-[0.625rem]">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-[0.625rem] font-['Staatliches',serif] text-[0.8125rem] tracking-[0.1em] text-[var(--text)] transition-all duration-300 [transition-timing-function:ease] hover:bg-[rgba(6,182,212,0.08)] max-[1024px]:px-[clamp(0.75rem,1.5vw,1rem)] max-[1024px]:py-[clamp(0.5rem,1vw,0.625rem)] max-[1024px]:text-[clamp(0.7rem,1vw,0.8125rem)] max-[768px]:gap-[clamp(0.3rem,0.5vw,0.5rem)] max-[768px]:px-[clamp(0.75rem,1.2vw,1rem)] max-[768px]:py-[clamp(0.5rem,0.8vw,0.625rem)] max-[768px]:text-[clamp(0.65rem,0.9vw,0.8125rem)] max-[480px]:px-[clamp(0.6rem,1vw,1rem)] max-[480px]:py-[clamp(0.4rem,0.7vw,0.625rem)] max-[480px]:text-[clamp(0.6rem,0.8vw,0.75rem)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
      </div>
    </Link>
  );
};

function PortfolioPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const requestedQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(requestedQuery);

  useEffect(() => {
    setQuery(requestedQuery);
  }, [requestedQuery]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data); // Show ALL projects
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    gsap.set(header.children, { y: 80, opacity: 0 });

    const headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    return () => {
      headerTrigger.kill();
    };
  }, []);

  const filters = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category)));
    return ["ALL", ...categories];
  }, [projects]);

  const requestedFilter = searchParams.get("filter")?.trim().toUpperCase() ?? "ALL";
  const activeFilter = filters.includes(requestedFilter) ? requestedFilter : "ALL";
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    const categoryMatchedProjects =
      activeFilter === "ALL"
        ? projects
        : projects.filter((project) => project.category === activeFilter);

    if (!normalizedQuery) {
      return categoryMatchedProjects;
    }

    return categoryMatchedProjects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [projects, activeFilter, normalizedQuery]);

  const requestedPage = Number(searchParams.get("page"));
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const activePage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(Math.floor(requestedPage), totalPages)
      : 1;
  const start = (activePage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  const pageNumbers = getPageNumbers(activePage, totalPages);

  const updateQuery = (nextFilter: string, nextPage: number, nextQuery: string = query) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilter === "ALL") {
      params.delete("filter");
    } else {
      params.set("filter", nextFilter);
    }

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const cleanedQuery = nextQuery.trim();
    if (cleanedQuery) {
      params.set("q", cleanedQuery);
    } else {
      params.delete("q");
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

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
      {/* Gradient Orbs Background */}
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        {/* Section Header */}
        <div ref={headerRef} className="mb-10 overflow-hidden text-center">
          <h2 className="sectionTitleGlobal">
            All <span style={{ color: "var(--accent)" }}>PROJECTS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            I’ve developed commercial projects as well as hobby projects. All projects are included (along with course related projects) here. - checkout my{" "}
            <Link href="/blog" className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80">
              blog
            </Link>{" "}
            while you're here. I write about technology, learning and memes.
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
              onChange={(event) => {
                const nextQuery = event.target.value;
                setQuery(nextQuery);
                updateQuery(activeFilter, 1, nextQuery);
              }}
              placeholder="Search by title, description, or tech..."
              className="h-12 w-full rounded-[14px] border border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.08)] pl-11 pr-11 text-[0.95rem] text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:bg-[rgba(var(--accent-rgb),0.12)]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  updateQuery(activeFilter, 1, "");
                }}
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
              onClick={() => updateQuery(filter, 1)}
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

        {/* Projects Grid */}
        {paginatedProjects.length === 0 ? (
          <div className="mb-[clamp(2rem,4vw,4rem)] rounded-[20px] border border-[rgba(var(--accent-rgb),0.2)] bg-[rgba(var(--accent-rgb),0.06)] p-8 text-center">
            <p className="mb-4 text-[var(--text-secondary)]">
              No projects matched <span className="text-[var(--text)]">&quot;{query}&quot;</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                updateQuery(activeFilter, 1, "");
              }}
              className="rounded-[999px] border border-[var(--accent)] px-4 py-2 font-['Staatliches',serif] text-[0.9rem] tracking-[0.08em] text-[var(--accent)] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            >
              CLEAR SEARCH
            </button>
          </div>
        ) : (
          <div className="mb-[clamp(2rem,4vw,4rem)] grid grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] max-[1024px]:grid-cols-2 max-[1024px]:gap-[clamp(1rem,2vw,1.25rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(0.875rem,2vw,1.25rem)] max-[480px]:grid-cols-1 max-[480px]:gap-[clamp(0.875rem,2vw,1.25rem)]">
            {paginatedProjects.map((project, index) => (
              <ProjectCard
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
              onClick={() => updateQuery(activeFilter, Math.max(1, activePage - 1))}
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
                  onClick={() => updateQuery(activeFilter, pageNumber)}
                  aria-current={activePage === pageNumber ? "page" : undefined}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[0.88rem] font-semibold transition-colors duration-200 ${
                    activePage === pageNumber
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]"
                      : "border-[rgba(6,182,212,0.35)] text-[var(--text)] hover:bg-[rgba(6,182,212,0.12)]"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => updateQuery(activeFilter, Math.min(totalPages, activePage + 1))}
              disabled={activePage === totalPages}
              className="inline-flex h-10 items-center gap-2 rounded-[999px] border border-[rgba(6,182,212,0.35)] px-4 text-[0.85rem] font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[rgba(6,182,212,0.12)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next <FiChevronRight size={16} />
            </button>
          </nav>
        ) : null}

        {/* More Projects Button */}
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

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <section
          id="portfolio"
          className="relative min-h-screen overflow-hidden py-[clamp(4rem,8vw,8rem)]"
          style={{ background: "var(--bg)" }}
        />
      }
    >
      <PortfolioPageContent />
    </Suspense>
  );
}
