import {
  GithubApiError,
  type GithubApiClient,
  type GithubCommitRecord,
  type GithubEventRecord,
  type GithubRepositoryRecord,
  type GithubUser,
  createGithubApiClient,
} from '../../../../lib/services/github-api.ts';
import type { DashboardProject, GithubStats, LatestCommit, UserProfile } from '../types';

export type DashboardData = {
  userProfile: UserProfile;
  stats: GithubStats;
  projects: DashboardProject[];
  latestCommits: LatestCommit[];
  latestCommitError: string | null;
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'John Doe',
  title: 'Frontend Developer',
  bio: 'Crafting beautiful, performant web experiences. Passionate about design systems and user interfaces.',
};

export const loadDashboardData = async (
  username: string,
  api: GithubApiClient = createGithubApiClient(),
): Promise<DashboardData> => {
  const user = await api.getUser(username);
  const repositories = await api.getRepositories(username);

  const projects = getRecentProjects(repositories);
  const stats = getStats(repositories, user);
  const commitsResult = await resolveLatestCommits({
    username,
    repositories,
    api,
  });

  return {
    userProfile: {
      ...DEFAULT_PROFILE,
      name: user.name || username,
      bio: user.bio || DEFAULT_PROFILE.bio,
    },
    stats,
    projects,
    latestCommits: commitsResult.latestCommits,
    latestCommitError: commitsResult.error,
  };
};

const getRecentProjects = (repositories: GithubRepositoryRecord[]): DashboardProject[] =>
  repositories
    .filter((repo) => Boolean(repo.pushed_at))
    .sort((a, b) => {
      const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
      const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      url: repo.html_url,
    }));

const getStats = (repositories: GithubRepositoryRecord[], user: GithubUser): GithubStats => ({
  stars: repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
  forks: repositories.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
  followers: user.followers || 0,
  repos: user.public_repos || 0,
});

type ResolveLatestCommitsArgs = {
  username: string;
  repositories: GithubRepositoryRecord[];
  api: GithubApiClient;
};

const resolveLatestCommits = async ({
  username,
  repositories,
  api,
}: ResolveLatestCommitsArgs): Promise<{ latestCommits: LatestCommit[]; error: string | null }> => {
  let latestCommits: LatestCommit[] = [];
  let latestCommitError: string | null = null;
  const seenCommits = new Set<string>();

  try {
    const events = await api.getPublicEvents(username);
    const commitsFromEvents = mapEventsToCommits(events);

    for (const commit of commitsFromEvents) {
      const key = `${commit.repoName}:${commit.sha}`;
      if (seenCommits.has(key)) continue;
      seenCommits.add(key);
      latestCommits.push(commit);
      if (latestCommits.length >= 3) break;
    }
  } catch (error) {
    latestCommitError = formatGithubError(error, 'events');
  }

  if (latestCommits.length < 3) {
    const recentlyPushedRepos = [...repositories]
      .filter((repo) => Boolean(repo.full_name && repo.pushed_at))
      .sort((a, b) => {
        const aTime = a.pushed_at ? new Date(a.pushed_at).getTime() : 0;
        const bTime = b.pushed_at ? new Date(b.pushed_at).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);

    for (const repo of recentlyPushedRepos) {
      if (latestCommits.length >= 3) {
        break;
      }

      try {
        const commits = await api.getRepositoryCommits(repo.full_name);

        for (const commit of commits) {
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

          if (latestCommits.length >= 3) {
            break;
          }
        }
      } catch (error) {
        latestCommitError = formatGithubError(error, 'latest commits');
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

const mapEventsToCommits = (events: GithubEventRecord[]): LatestCommit[] =>
  events.flatMap((event) => {
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

const formatGithubError = (error: unknown, scope: 'events' | 'latest commits') => {
  if (error instanceof GithubApiError) {
    if (error.rateLimited) {
      return `GitHub API rate limit hit while loading ${scope}.`;
    }

    return `GitHub API error (${error.status ?? 'unknown'}) while loading ${scope}.`;
  }

  return `Failed to load ${scope} from GitHub API.`;
};

export const mapGithubCommit = (repo: GithubRepositoryRecord, commit: GithubCommitRecord): LatestCommit => {
  const committedAt =
    commit.commit.author?.date ||
    commit.commit.committer?.date ||
    repo.pushed_at ||
    new Date().toISOString();

  return {
    sha: commit.sha,
    message: commit.commit.message.split('\n')[0] || 'New commit',
    repoName: repo.full_name,
    committedAt,
    commitUrl: commit.html_url || `https://github.com/${repo.full_name}/commit/${commit.sha}`,
  };
};
