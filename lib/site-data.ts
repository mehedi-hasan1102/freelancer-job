import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const DATA_DIR = path.join(process.cwd(), "public", "data");

type JsonObject = Record<string, unknown>;

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null;

const readJsonFile = <T>(fileName: string, fallback: T): T => {
  const filePath = path.join(DATA_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  screenshot1: string;
  screenshot2: string;
  screenshot3: string;
  tech: string[];
  liveUrl: string;
  frontendUrl: string;
  backendUrl: string;
  year: string;
  challenges: string[];
  futurePlans: string[];
};

export type ExperienceItem = {
  id: number;
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  credentialUrl?: string;
  credentialLabel?: string;
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  skills: string[];
  credentialUrl?: string;
};

const toProject = (value: unknown): Project | null => {
  if (!isObject(value)) {
    return null;
  }

  const id = typeof value.id === "number" ? value.id : null;
  const slug = typeof value.slug === "string" ? value.slug : null;
  const title = typeof value.title === "string" ? value.title : null;

  if (!id || !slug || !title) {
    return null;
  }

  return {
    id,
    slug,
    title,
    category: typeof value.category === "string" ? value.category : "",
    description: typeof value.description === "string" ? value.description : "",
    image: typeof value.image === "string" ? value.image : "",
    screenshot1: typeof value.screenshot1 === "string" ? value.screenshot1 : "",
    screenshot2: typeof value.screenshot2 === "string" ? value.screenshot2 : "",
    screenshot3: typeof value.screenshot3 === "string" ? value.screenshot3 : "",
    tech: toStringArray(value.tech),
    liveUrl: typeof value.liveUrl === "string" ? value.liveUrl : "",
    frontendUrl: typeof value.frontendUrl === "string" ? value.frontendUrl : "",
    backendUrl: typeof value.backendUrl === "string" ? value.backendUrl : "",
    year: typeof value.year === "string" ? value.year : "",
    challenges: toStringArray(value.challenges),
    futurePlans: toStringArray(value.futurePlans),
  };
};

const toExperienceItem = (value: unknown): ExperienceItem | null => {
  if (!isObject(value)) {
    return null;
  }

  const id = typeof value.id === "number" ? value.id : null;
  const type = value.type === "work" || value.type === "education" ? value.type : null;

  if (!id || !type) {
    return null;
  }

  return {
    id,
    type,
    title: typeof value.title === "string" ? value.title : "",
    company: typeof value.company === "string" ? value.company : "",
    location: typeof value.location === "string" ? value.location : "",
    period: typeof value.period === "string" ? value.period : "",
    description: typeof value.description === "string" ? value.description : "",
    achievements: toStringArray(value.achievements),
    tech: toStringArray(value.tech),
    credentialUrl:
      typeof value.credentialUrl === "string" && value.credentialUrl.length > 0
        ? value.credentialUrl
        : undefined,
    credentialLabel:
      typeof value.credentialLabel === "string" && value.credentialLabel.length > 0
        ? value.credentialLabel
        : undefined,
  };
};

const toCertificate = (value: unknown): Certificate | null => {
  if (!isObject(value)) {
    return null;
  }

  const id = typeof value.id === "number" ? value.id : null;
  const title = typeof value.title === "string" ? value.title : null;

  if (!id || !title) {
    return null;
  }

  return {
    id,
    title,
    issuer: typeof value.issuer === "string" ? value.issuer : "",
    year: typeof value.year === "string" ? value.year : "",
    image: typeof value.image === "string" ? value.image : "",
    skills: toStringArray(value.skills),
    credentialUrl:
      typeof value.credentialUrl === "string" && value.credentialUrl.length > 0
        ? value.credentialUrl
        : undefined,
  };
};

export const getProjects = cache((): Project[] => {
  const parsed = readJsonFile<unknown[]>("projects.json", []);
  return parsed.map(toProject).filter((project): project is Project => project !== null);
});

export const getProjectBySlug = cache((slug: string): Project | null => {
  const decodedSlug = (() => {
    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  })();

  return getProjects().find((project) => project.slug === decodedSlug) ?? null;
});

export const getProjectSlugs = cache((): string[] =>
  getProjects().map((project) => project.slug),
);

export const getSelectedProjects = cache((): Project[] => {
  const parsed = readJsonFile<unknown[]>("selected-projects.json", []);
  return parsed.map(toProject).filter((project): project is Project => project !== null);
});

export const getExperienceItems = cache((): ExperienceItem[] => {
  const parsed = readJsonFile<unknown[]>("experience.json", []);
  return parsed
    .map(toExperienceItem)
    .filter((item): item is ExperienceItem => item !== null);
});

export const getCertificates = cache((): Certificate[] => {
  const parsed = readJsonFile<unknown[]>("certificates.json", []);
  return parsed
    .map(toCertificate)
    .filter((certificate): certificate is Certificate => certificate !== null);
});
