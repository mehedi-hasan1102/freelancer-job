'use client';

import Image from 'next/image';
import { FiGithub, FiStar, FiGitBranch, FiCode, FiExternalLink, FiGitCommit, FiClock } from 'react-icons/fi'
import { FaStar, FaCodeBranch, FaUsers, FaBox } from "react-icons/fa";;
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface Project {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url?: string;
}

interface GithubStats {
  stars: number;
  forks: number;
  followers: number;
  repos: number;
}

interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string | null;
}

interface GithubEventCommit {
  sha: string;
  message: string;
}

interface GithubEvent {
  type: string;
  repo?: {
    name: string;
  };
  created_at?: string;
  payload?: {
    commits?: GithubEventCommit[];
  };
}

interface GithubCommitResponse {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: {
      date?: string;
    };
    committer?: {
      date?: string;
    };
  };
}

interface LatestCommit {
  sha: string;
  message: string;
  repoName: string;
  committedAt: string;
  commitUrl: string;
}

const DASHBOARD = 'relative min-h-screen overflow-hidden bg-[var(--bg)] py-[clamp(4rem,8vw,8rem)]';
const DASHBOARD_CONTAINER = 'relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)] max-[768px]:px-8 max-[640px]:px-6';
const HEADER = 'mb-10 flex flex-col gap-3 overflow-hidden text-left';
const TITLE_ACCENT = 'text-[var(--accent)]';
const MAIN_GRID = 'mb-12 grid grid-cols-2 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-4';
const CARD = 'group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(6,182,212,0.25)] bg-transparent p-8 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:border-[rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] max-[640px]:p-6';
const CARD_GLOW = 'pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100';
const PROFILE_CARD = 'col-[1/2] row-[1/2] max-[768px]:col-[1/-1] max-[768px]:row-auto';
const STATS_CARD = 'col-[2/3] row-[1/2] max-[768px]:col-[1/-1] max-[768px]:row-auto';
const SECTION_HEADER = 'relative z-[1] mb-6 flex flex-wrap items-center justify-between gap-4 max-[768px]:flex-col max-[768px]:items-start';
const SECTION_TITLE = 'm-0 flex items-center gap-2 text-[clamp(1rem,2vw,1.25rem)] font-semibold tracking-[-0.01em] text-[var(--text)] max-[640px]:text-[0.95rem]';
const VIEW_LINK = 'flex items-center gap-1 text-[0.8rem] font-medium text-[var(--accent)] no-underline transition-all duration-200 [transition-timing-function:ease] hover:gap-2';
const PROJECTS_GRID = 'grid grid-cols-3 gap-6 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1';
const PROJECT_CARD = 'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(6,182,212,0.25)] bg-transparent p-7 [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform hover:border-[rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] max-[640px]:p-6';
const PROJECT_GLOW = 'pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100';
const PROJECT_LINK_ICON = 'absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100';

const formatCommitDate = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const formatRelativeTime = (timestamp: string) => {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

// Dashboard Skeleton Loading
const DashboardSkeleton = () => {
  const isDarkMode = typeof document !== 'undefined' ? !document.documentElement.classList.contains('light-mode') : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';

  return (
    <div className={DASHBOARD}>
      <div className={DASHBOARD_CONTAINER}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              width: '60%',
              height: '64px',
              borderRadius: '12px',
              background: shimmerBg,
              margin: '0 auto',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>

        {/* Main Grid Skeleton */}
        <div className={MAIN_GRID}>
          {[1, 2].map((i) => (
            <div key={i} className={CARD}>
              <div
                style={{
                  width: '40%',
                  height: '24px',
                  borderRadius: '6px',
                  background: shimmerBg,
                  marginBottom: '1.25rem',
                  animation: 'shimmer 2s infinite',
                }}
              />
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  style={{
                    width: j === 3 ? '70%' : '100%',
                    height: '14px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginBottom: '0.75rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Contributions Skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <div className={CARD}>
            <div
              style={{
                width: '30%',
                height: '24px',
                borderRadius: '6px',
                background: shimmerBg,
                marginBottom: '1.5rem',
                animation: 'shimmer 2s infinite',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '140px',
                borderRadius: '12px',
                background: shimmerBg,
                animation: 'shimmer 2s infinite',
              }}
            />
          </div>
        </div>

        {/* Projects Skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              width: '35%',
              height: '24px',
              borderRadius: '6px',
              background: shimmerBg,
              marginBottom: '1.5rem',
              animation: 'shimmer 2s infinite',
            }}
          />
          <div className={PROJECTS_GRID}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={PROJECT_CARD}>
                <div
                  style={{
                    width: '70%',
                    height: '18px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginBottom: '0.75rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: j === 2 ? '60%' : '100%',
                      height: '12px',
                      borderRadius: '6px',
                      background: shimmerBg,
                      marginBottom: '0.5rem',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                ))}
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginTop: '1rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Project Card Component with Glow Effect
const ProjectCardItem = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <a
      ref={cardRef}
      className={PROJECT_CARD + ' focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      aria-label={`Open project ${project.name} in new tab`}
    >
      <div ref={glowRef} className={PROJECT_GLOW} />
      <span className={PROJECT_LINK_ICON} aria-hidden="true">
        <FiExternalLink size={18} />
      </span>
      <h3 className="relative z-[1] mb-2 block font-['Staatliches',serif] text-[1rem] font-semibold tracking-[0.05em] text-[var(--accent)] no-underline">
        {project.name}
      </h3>
      <p className="relative z-[1] mb-3 flex-1 text-[0.8rem] leading-[1.5] text-[var(--text-secondary)]">{project.description}</p>
      <div className="relative z-[1] flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(6,182,212,0.15)] pt-3 text-[0.7rem] text-[var(--text-secondary)]">
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiCode size={14} /> {project.language}
        </span>
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiStar size={14} /> {project.stars}
        </span>
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiGitBranch size={14} /> {project.forks}
        </span>
      </div>
    </a>
  );
};

// Profile Card Component with Glow Effect
const ProfileCardItem = ({ userProfile }: { userProfile: UserProfile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${CARD} ${PROFILE_CARD}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={CARD_GLOW} />
      <div className="relative z-[1] flex flex-col gap-4">
        <Image 
          src="/profile/profile.png" 
          alt={userProfile.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <div className="text-[1.1rem] font-semibold text-[var(--text)]">{userProfile.name}</div>
        </div>
        <p className="my-2 text-[0.825rem] leading-[1.5] text-[var(--text-secondary)]">{userProfile.bio}</p>
      </div>
    </div>
  );
};

// Stats Card Component with Glow Effect
const StatsCardItem = ({ stats }: { stats: GithubStats }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${CARD} ${STATS_CARD}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={CARD_GLOW} />
      <h3 className={`${SECTION_TITLE} relative z-[1] mb-6`}>
        <FiGithub /> GitHub Stats
      </h3>
      
<div className="grid grid-cols-4 gap-3 max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
  
  <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
    <FaStar className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
    <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
      {stats.stars.toLocaleString()}
    </div>
    <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
      Stars
    </div>
  </div>

  <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
    <FaCodeBranch className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
    <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
      {stats.forks}
    </div>
    <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
      Forks
    </div>
  </div>

  <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
    <FaUsers className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
    <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
      {stats.followers.toLocaleString()}
    </div>
    <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
      Followers
    </div>
  </div>

  <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
    <FaBox className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
    <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
      {stats.repos}
    </div>
    <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
      Repos
    </div>
  </div>

</div>


    </div>
  );
};

// Contributions Card Component with Glow Effect
const ContributionsCardItem = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={CARD}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={CARD_GLOW} />
      <div className={SECTION_HEADER}>
        <h2 className={SECTION_TITLE}>
          <FiCode /> Contributions
        </h2>
        <a href={`https://github.com/mehedi-hasan1102`} target="_blank" rel="noopener noreferrer" className={VIEW_LINK}>
          View on GitHub <FaArrowRight className="text-[var(--accent)]" />
        </a>
      </div>
      <div style={{ width: '100%', overflow: 'auto', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
        <Image
          src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
          alt="GitHub contribution graph"
          width={1200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      </div>
    </div>
  );
};

const LatestCommitCardItem = ({
  latestCommits,
  errorMessage,
}: {
  latestCommits: LatestCommit[];
  errorMessage: string | null;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={cardRef} className={CARD} onMouseMove={handleMouseMove}>
      <div ref={glowRef} className={CARD_GLOW} />
      <div className={SECTION_HEADER}>
        <h2 className={SECTION_TITLE}>
          <FiGitCommit /> Latest Commits
        </h2>
        {latestCommits.length > 0 ? (
          <a href="https://github.com/mehedi-hasan1102" target="_blank" rel="noopener noreferrer" className={VIEW_LINK}>
            View profile <FaArrowRight className="text-[var(--accent)]" />
          </a>
        ) : null}
      </div>

      {latestCommits.length > 0 ? (
        <div className="relative z-[1] space-y-5">
          {latestCommits.map((commit, index) => (
            <div
              key={`${commit.repoName}-${commit.sha}`}
              className={`pb-5 ${index < latestCommits.length - 1 ? 'border-b border-[rgba(6,182,212,0.15)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-['Staatliches',serif] text-[clamp(0.95rem,1.8vw,1.15rem)] tracking-[0.04em] text-[var(--accent)]">
                  {commit.message}
                </p>
                <a
                  href={commit.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--accent)] transition-all duration-200 hover:gap-2"
                >
                  Open <FiExternalLink size={13} />
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                <span className="rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  {commit.repoName}
                </span>
                <span className="rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  #{commit.sha.slice(0, 7)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  <FiClock size={12} /> {formatRelativeTime(commit.committedAt)}
                </span>
              </div>
              <p className="mt-3 text-[0.8rem] text-[var(--text-secondary)]">
                {formatCommitDate(commit.committedAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="relative z-[1] text-[0.9rem] text-[var(--text-secondary)]">
          {errorMessage || 'Could not load latest commit right now.'}
        </p>
      )}
    </div>
  );
};


const DeveloperDashboard = () => {
  // States
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    title: 'Frontend Developer',
    bio: 'Crafting beautiful, performant web experiences. Passionate about design systems and user interfaces.',
  });

  const [stats, setStats] = useState<GithubStats>({
    stars: 0,
    forks: 0,
    followers: 0,
    repos: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [latestCommits, setLatestCommits] = useState<LatestCommit[]>([]);
  const [latestCommitError, setLatestCommitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub Data
  const fetchGitHubData = async (username: string) => {
    try {
      // Fetch user data
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();
      
      setUserProfile(prev => ({
        ...prev,
        name: userData.name || username,
        bio: userData.bio || prev.bio,
      }));

      // Fetch all repositories to calculate total stats
      const allReposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const allReposData = await allReposRes.json() as GithubRepository[];

      // Calculate total stars and forks from all repos
      const totalStars = allReposData.reduce((sum: number, repo: GithubRepository) => sum + (repo.stargazers_count || 0), 0);
      const totalForks = allReposData.reduce((sum: number, repo: GithubRepository) => sum + (repo.forks_count || 0), 0);

      setStats({
        stars: totalStars,
        forks: totalForks,
        followers: userData.followers || 0,
        repos: userData.public_repos || 0,
      });

      // Get latest 3 repos by push time for Recent Projects section
      const topRepos = allReposData
        .filter((repo: GithubRepository) => Boolean(repo.pushed_at))
        .sort((a: GithubRepository, b: GithubRepository) => {
          const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
          const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
          return bTime - aTime;
        })
        .slice(0, 3);

      const formattedProjects: Project[] = topRepos.map((repo: GithubRepository) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
      }));

      setProjects(formattedProjects);

      let resolvedLatestCommits: LatestCommit[] = [];
      let latestCommitLoadError: string | null = null;
      const seenCommits = new Set<string>();

      // Get latest public commits from recent push events first
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`);
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json() as GithubEvent[];
        const commitsFromEvents = eventsData.flatMap((event) => {
          if (event.type !== 'PushEvent') return [];
          if (!event.payload?.commits?.length || !event.repo?.name || !event.created_at) return [];

          return event.payload.commits.map((commit) => ({
            sha: commit.sha,
            message: commit.message.split('\n')[0] || 'New commit',
            repoName: event.repo!.name,
            committedAt: event.created_at!,
            commitUrl: `https://github.com/${event.repo!.name}/commit/${commit.sha}`,
          }));
        });

        for (const commit of commitsFromEvents) {
          const key = `${commit.repoName}:${commit.sha}`;
          if (seenCommits.has(key)) continue;
          seenCommits.add(key);
          resolvedLatestCommits.push(commit);
          if (resolvedLatestCommits.length >= 3) break;
        }
      } else {
        latestCommitLoadError = `GitHub API error (${eventsRes.status}) while loading events.`;
      }

      // Fallback: fetch commits from most recently pushed repositories
      if (resolvedLatestCommits.length < 3) {
        const recentlyPushedRepos = [...allReposData]
          .filter((repo) => Boolean(repo.full_name && repo.pushed_at))
          .sort((a, b) => {
            const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
            const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
            return bTime - aTime;
          })
          .slice(0, 5);

        for (const repo of recentlyPushedRepos) {
          if (resolvedLatestCommits.length >= 3) break;

          const commitsRes = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=3`);
          if (!commitsRes.ok) {
            latestCommitLoadError = `GitHub API error (${commitsRes.status}) while loading latest commits.`;
            continue;
          }

          const commitsData = await commitsRes.json() as GithubCommitResponse[];

          for (const commit of commitsData) {
            const key = `${repo.full_name}:${commit.sha}`;
            if (seenCommits.has(key)) continue;
            seenCommits.add(key);

            const committedAt =
              commit.commit.author?.date ||
              commit.commit.committer?.date ||
              repo.pushed_at ||
              new Date().toISOString();

            resolvedLatestCommits.push({
              sha: commit.sha,
              message: commit.commit.message.split('\n')[0] || 'New commit',
              repoName: repo.full_name,
              committedAt,
              commitUrl: commit.html_url || `https://github.com/${repo.full_name}/commit/${commit.sha}`,
            });

            if (resolvedLatestCommits.length >= 3) break;
          }
        }
      }

      resolvedLatestCommits = resolvedLatestCommits
        .sort((a, b) => new Date(b.committedAt).getTime() - new Date(a.committedAt).getTime())
        .slice(0, 3);

      if (resolvedLatestCommits.length > 0) {
        latestCommitLoadError = null;
      } else if (!latestCommitLoadError) {
        latestCommitLoadError = 'No recent public repository activity found.';
      }

      setLatestCommits(resolvedLatestCommits);
      setLatestCommitError(latestCommitLoadError);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLatestCommits([]);
      setLatestCommitError('Failed to load latest commit due to a network error.');
    }
  };

  // Initialize dashboard data
  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Fetch GitHub data
        await fetchGitHubData('mehedi-hasan1102');
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        // Always set loading to false, even if there's an error
        setLoading(false);
      }
    };

    initDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={DASHBOARD}>
      <div className={DASHBOARD_CONTAINER}>
        {/* Header */}
        <div className={HEADER}>
          <h1 className="sectionTitleGlobal">
            Developer <span className={TITLE_ACCENT}>Dashboard</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                 Built with Next.js serverless API routes, this dashboard tracks and visualizes metrics across platforms like GitHub to provide actionable insights.
            </p>
        </div>

        {/* Main Grid with Profile, Stats, and Now Playing */}
        <div className={MAIN_GRID}>
          {/* Profile Card */}
          <ProfileCardItem userProfile={userProfile} />

          {/* GitHub Stats Card */}
          <StatsCardItem stats={stats} />
        </div>

        {/* Contributions Section */}
        <div className="mb-12">
          <ContributionsCardItem />
        </div>

        {/* Latest Commit Section */}
        <div className="mb-12">
          <LatestCommitCardItem latestCommits={latestCommits} errorMessage={latestCommitError} />
        </div>

        {/* Recent Projects Section */}
        <div className="mb-12">
          <div className={SECTION_HEADER}>
            <h2 className={SECTION_TITLE}>Recent Projects</h2>
            <a href="https://github.com/mehedi-hasan1102" target="_blank" rel="noopener noreferrer" className={VIEW_LINK}>
              View all <FaArrowRight className="text-[var(--accent)]" />
            </a>
          </div>
          <div className={PROJECTS_GRID}>
            {projects.length > 0 ? (
              projects.map((project) => <ProjectCardItem key={project.id} project={project} />)
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                Loading projects...
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DeveloperDashboard;
