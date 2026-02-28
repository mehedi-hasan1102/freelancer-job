'use client';

import { FaArrowRight } from 'react-icons/fa';
import { PROJECTS_GRID, SECTION_HEADER, SECTION_TITLE, VIEW_LINK } from '../constants';
import type { DashboardProject } from '../types';
import ProjectCard from './ProjectCard';

type RecentProjectsSectionProps = {
  projects: DashboardProject[];
  username: string;
};

export default function RecentProjectsSection({
  projects,
  username,
}: RecentProjectsSectionProps) {
  return (
    <div className="mb-12">
      <div className={SECTION_HEADER}>
        <h2 className={SECTION_TITLE}>Recent Projects</h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={VIEW_LINK}
        >
          View all <FaArrowRight className="text-[var(--accent)]" />
        </a>
      </div>
      <div className={PROJECTS_GRID}>
        {projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              padding: '2rem',
            }}
          >
            Loading projects...
          </div>
        )}
      </div>
    </div>
  );
}
