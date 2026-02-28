"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/lib/site-data";
import { getPageNumbers, parsePageParam, PROJECTS_PER_PAGE } from "./utils";

type PortfolioSearchParams = {
  q?: string;
  filter?: string;
  page?: string;
};

type UsePortfolioStateArgs = {
  projects: Project[];
  initialSearchParams: PortfolioSearchParams;
};

const normalizeFilter = (value: string | undefined) =>
  value?.trim().toUpperCase() || "ALL";

const normalizeQuery = (value: string | undefined) => value?.trim() ?? "";

export const usePortfolioState = ({
  projects,
  initialSearchParams,
}: UsePortfolioStateArgs) => {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(normalizeQuery(initialSearchParams.q));
  const [activeFilter, setActiveFilter] = useState(
    normalizeFilter(initialSearchParams.filter),
  );
  const [activePage, setActivePage] = useState(parsePageParam(initialSearchParams.page));

  const filters = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category)));
    return ["ALL", ...categories];
  }, [projects]);

  const resolvedFilter = filters.includes(activeFilter) ? activeFilter : "ALL";

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    const categoryMatchedProjects =
      resolvedFilter === "ALL"
        ? projects
        : projects.filter((project) => project.category === resolvedFilter);

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
  }, [projects, query, resolvedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const resolvedPage = Math.min(activePage, totalPages);
  const start = (resolvedPage - 1) * PROJECTS_PER_PAGE;

  const paginatedProjects = filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  const pageNumbers = getPageNumbers(resolvedPage, totalPages);

  const updateUrl = (nextFilter: string, nextPage: number, nextQuery: string) => {
    const params = new URLSearchParams();

    if (nextFilter !== "ALL") {
      params.set("filter", nextFilter);
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const cleanedQuery = nextQuery.trim();

    if (cleanedQuery) {
      params.set("q", cleanedQuery);
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const changeFilter = (nextFilter: string) => {
    setActiveFilter(nextFilter);
    setActivePage(1);
    updateUrl(nextFilter, 1, query);
  };

  const changePage = (nextPage: number) => {
    setActivePage(nextPage);
    updateUrl(resolvedFilter, nextPage, query);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setActivePage(1);
    updateUrl(resolvedFilter, 1, nextQuery);
  };

  const clearQuery = () => {
    setQuery("");
    setActivePage(1);
    updateUrl(resolvedFilter, 1, "");
  };

  return {
    query,
    filters,
    activeFilter: resolvedFilter,
    filteredProjects,
    paginatedProjects,
    totalPages,
    activePage: resolvedPage,
    pageNumbers,
    start,
    changeFilter,
    changePage,
    changeQuery,
    clearQuery,
  };
};
