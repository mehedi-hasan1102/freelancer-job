import type { Project } from '@/lib/site-data';

export type CaseStudyContent = {
  problemPoints: string[];
  solutionPoints: string[];
  resultPoints: string[];
};

const DEFAULT_PROBLEM_POINTS = [
  'Unclear information hierarchy reduced user confidence during core interactions.',
  'Performance bottlenecks slowed down key screens on mobile and low-power devices.',
  'UI patterns were inconsistent across pages and increased maintenance overhead.',
];

export const buildCaseStudyContent = (project: Project): CaseStudyContent => {
  const problemPoints =
    project.challenges.length > 0
      ? project.challenges.slice(0, 3)
      : DEFAULT_PROBLEM_POINTS;

  return {
    problemPoints,
    solutionPoints: [
      `Implemented a focused delivery plan using ${project.tech.join(', ')}.`,
      `Resolved the highest-impact ${problemPoints.length} problem areas with iterative QA.`,
      'Standardized components and interaction patterns for cleaner scaling.',
    ],
    resultPoints: [
      `${project.tech.length}+ core technologies integrated in the production build.`,
      `${problemPoints.length} primary product challenges addressed end-to-end.`,
      `${project.futurePlans.length || 3} roadmap improvements documented for the next release.`,
    ],
  };
};
