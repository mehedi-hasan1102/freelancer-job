'use client';

import { DASHBOARD, DASHBOARD_CONTAINER, HEADER, MAIN_GRID, TITLE_ACCENT } from './constants';
import { useGithubDashboardData } from './hooks/useGithubDashboardData';
import ContributionsCard from './components/ContributionsCard';
import DashboardSkeleton from './components/DashboardSkeleton';
import LatestCommitCard from './components/LatestCommitCard';
import ProfileCard from './components/ProfileCard';
import RecentProjectsSection from './components/RecentProjectsSection';
import StatsCard from './components/StatsCard';

const GITHUB_USERNAME = 'mehedi-hasan1102';

export default function DeveloperDashboardClient() {
  const {
    loading,
    latestCommitError,
    latestCommits,
    projects,
    stats,
    userProfile,
  } = useGithubDashboardData(GITHUB_USERNAME);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={DASHBOARD}>
      <div className={DASHBOARD_CONTAINER}>
        <div className={HEADER}>
          <h1 className="sectionTitleGlobal">
            Developer <span className={TITLE_ACCENT}>Dashboard</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            Built with Next.js serverless API routes, this dashboard tracks and visualizes metrics
            across platforms like GitHub to provide actionable insights.
          </p>
        </div>

        <div className={MAIN_GRID}>
          <ProfileCard userProfile={userProfile} />
          <StatsCard stats={stats} />
        </div>

        <div className="mb-12">
          <ContributionsCard username={GITHUB_USERNAME} />
        </div>

        <div className="mb-12">
          <LatestCommitCard
            latestCommits={latestCommits}
            errorMessage={latestCommitError}
            username={GITHUB_USERNAME}
          />
        </div>

        <RecentProjectsSection projects={projects} username={GITHUB_USERNAME} />
      </div>
    </div>
  );
}
