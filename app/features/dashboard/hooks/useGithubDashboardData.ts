"use client";

import { useEffect, useState } from 'react';
import { GithubApiError } from '@/lib/services/github-api';
import { loadDashboardData } from '../services/loadDashboardData';
import type { DashboardProject, GithubStats, LatestCommit, UserProfile } from '../types';

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
        const data = await loadDashboardData(username);

        if (cancelled) {
          return;
        }

        setState({
          loading: false,
          ...data,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        const errorMessage =
          error instanceof GithubApiError && error.rateLimited
            ? 'GitHub API rate limit exceeded. Please try again later.'
            : 'Failed to load latest commit due to a network error.';

        setState((prev) => ({
          ...prev,
          loading: false,
          latestCommits: [],
          latestCommitError: errorMessage,
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
