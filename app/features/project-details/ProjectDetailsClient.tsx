'use client';

import { useRef } from 'react';
import type { Project } from '@/lib/site-data';
import { buildCaseStudyContent } from './case-study';
import CaseStudySection from './components/CaseStudySection';
import BackToPortfolioLink from './components/BackToPortfolioLink';
import ProjectHeroSection from './components/ProjectHeroSection';
import ScreenshotsSection from './components/ScreenshotsSection';
import TechStackSection from './components/TechStackSection';
import { useBottomCardGlow } from './hooks/useBottomCardGlow';
import { useProjectDetailsAnimations } from './hooks/useProjectDetailsAnimations';
import { projectDetailsStyles } from './projectDetailsStyles';

type ProjectDetailsClientProps = {
  project: Project;
};

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useProjectDetailsAnimations(pageRef, Boolean(project));
  useBottomCardGlow();

  const caseStudyContent = buildCaseStudyContent(project);

  return (
    <div ref={pageRef} className="projectDetailsPage">
      <BackToPortfolioLink />
      <ProjectHeroSection project={project} />
      <TechStackSection techStack={project.tech} />
      <ScreenshotsSection
        title={project.title}
        screenshots={[project.screenshot1, project.screenshot2, project.screenshot3]}
      />
      <CaseStudySection content={caseStudyContent} />
      <style dangerouslySetInnerHTML={{ __html: projectDetailsStyles }} />
    </div>
  );
}
