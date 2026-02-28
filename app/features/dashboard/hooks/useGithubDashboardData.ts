"use client";

import { useEffect, useState } from 'react';
import type {
  DashboardProject,
  GithubCommitResponse,
  GithubEvent,
  GithubRepository,
  GithubStats,
  LatestCommit,
  UserProfile,
} from '../types';

type GithubDashboardState = {
  loading: boolean;
  userProfile: UserProfile;
  stats: GithubStats;
  projects: DashboardProject[];
  latestCommits: LatestCommit[];
  latestCommitError: string | null;
};

const INITIAL_PROFILE: UserProfile = {
  name: 'John Doe',
  title: 'Frontend Developer',
  bio: 'Crafting beautiful, performant web experiences. Passionate about design systems and user interfaces.',
};

const INITIAL_STATS: GithubStats = {
  stars: 0,
  forks: 0,
  followers: 0,
  repos: 0,
};

const parseJson = async <T>(response: Response): Promise<T | null> => {
  if (!response.ok) {
    return null;
  }

  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
};

export const useGithubDashboardData = (username: string) => {
  const [state, setState] = useState<GithubDashboardState>({
    loading: true,
    userProfile: INITIAL_PROFILE,
    stats: INITIAL_STATS,
    projects: [],
    latestCommits: [],
    latestCommitError: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await parseJson<{ name?: string; bio?: string; followers?: number; public_repos?: number }>(
          userRes,
        );

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = (await parseJson<GithubRepository[]>(reposRes)) ?? [];

        if (cancelled) {
          return;
        }

        const totalStars = reposData.reduce(
          (sum, repo) => sum + (repo.stargazers_count || 0),
          0,
        );
        const totalForks = reposData.reduce(
          (sum, repo) => sum + (repo.forks_count || 0),
          0,
        );

        const topRepos = reposData
          .filter((repo) => Boolean(repo.pushed_at))
          .sort((a, b) => {
            const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
            const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
            return bTime - aTime;
          })
          .slice(0, 3);

        const projects: DashboardProject[] = topRepos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          url: repo.html_url,
        }));

        const latestCommitsResult = await resolveLatestCommits(username, reposData);

        if (cancelled) {
          return;
        }

        setState({
          loading: false,
          userProfile: {
            ...INITIAL_PROFILE,
            name: userData?.name || username,
            bio: userData?.bio || INITIAL_PROFILE.bio,
          },
          stats: {
            stars: totalStars,
            forks: totalForks,
            followers: userData?.followers || 0,
            repos: userData?.public_repos || 0,
          },
          projects,
          latestCommits: latestCommitsResult.latestCommits,
          latestCommitError: latestCommitsResult.error,
        });
      } catch {
        if (cancelled) {
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          latestCommits: [],
          latestCommitError: 'Failed to load latest commit due to a network error.',
        }));
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
};

const resolveLatestCommits = async (
  username: string,
  allRepos: GithubRepository[],
): Promise<{ latestCommits: LatestCommit[]; error: string | null }> => {
  let latestCommits: LatestCommit[] = [];
  let latestCommitError: string | null = null;
  const seenCommits = new Set<string>();

  const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`);
  if (eventsRes.ok) {
    const eventsData = (await parseJson<GithubEvent[]>(eventsRes)) ?? [];
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
      latestCommits.push(commit);
      if (latestCommits.length >= 3) break;
    }
  } else {
    latestCommitError = `GitHub API error (${eventsRes.status}) while loading events.`;
  }

  if (latestCommits.length < 3) {
    const recentlyPushedRepos = [...allRepos]
      .filter((repo) => Boolean(repo.full_name && repo.pushed_at))
      .sort((a, b) => {
        const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
        const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);

    for (const repo of recentlyPushedRepos) {
      if (latestCommits.length >= 3) break;

      const commitsRes = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=3`);
      if (!commitsRes.ok) {
        latestCommitError = `GitHub API error (${commitsRes.status}) while loading latest commits.`;
        continue;
      }

      const commitsData = (await parseJson<GithubCommitResponse[]>(commitsRes)) ?? [];

      for (const commit of commitsData) {
        const key = `${repo.full_name}:${commit.sha}`;
        if (seenCommits.has(key)) continue;
        seenCommits.add(key);

        const committedAt =
          commit.commit.author?.date ||
          commit.commit.committer?.date ||
          repo.pushed_at ||
          new Date().toISOString();

        latestCommits.push({
          sha: commit.sha,
          message: commit.commit.message.split('\n')[0] || 'New commit',
          repoName: repo.full_name,
          committedAt,
          commitUrl: commit.html_url || `https://github.com/${repo.full_name}/commit/${commit.sha}`,
        });

        if (latestCommits.length >= 3) break;
      }
    }
  }

  latestCommits = latestCommits
    .sort((a, b) => new Date(b.committedAt).getTime() - new Date(a.committedAt).getTime())
    .slice(0, 3);

  if (latestCommits.length > 0) {
    latestCommitError = null;
  } else if (!latestCommitError) {
    latestCommitError = 'No recent public repository activity found.';
  }

  return {
    latestCommits,
    error: latestCommitError,
  };
};
