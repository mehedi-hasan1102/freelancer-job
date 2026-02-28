export type GithubFetch = typeof fetch;

export class GithubApiError extends Error {
  status?: number;
  rateLimited: boolean;

  constructor(message: string, options?: { status?: number; rateLimited?: boolean }) {
    super(message);
    this.name = 'GithubApiError';
    this.status = options?.status;
    this.rateLimited = Boolean(options?.rateLimited);
  }
}

export type GithubUser = {
  name?: string;
  bio?: string;
  followers?: number;
  public_repos?: number;
};

export type GithubRepositoryRecord = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string | null;
};

export type GithubEventRecord = {
  type: string;
  repo?: {
    name: string;
  };
  created_at?: string;
  payload?: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
};

export type GithubCommitRecord = {
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
};

export type GithubApiClient = {
  getUser: (username: string) => Promise<GithubUser>;
  getRepositories: (username: string) => Promise<GithubRepositoryRecord[]>;
  getPublicEvents: (username: string) => Promise<GithubEventRecord[]>;
  getRepositoryCommits: (fullName: string) => Promise<GithubCommitRecord[]>;
};

const GITHUB_BASE_URL = 'https://api.github.com';

const buildApiError = (response: Response) => {
  const isRateLimited =
    response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0';

  return new GithubApiError(
    isRateLimited
      ? 'GitHub API rate limit exceeded.'
      : `GitHub API request failed with status ${response.status}.`,
    {
      status: response.status,
      rateLimited: isRateLimited,
    },
  );
};

const requestJson = async <T>(fetcher: GithubFetch, url: string): Promise<T> => {
  let response: Response;

  try {
    response = await fetcher(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
    });
  } catch {
    throw new GithubApiError('Network request to GitHub API failed.');
  }

  if (!response.ok) {
    throw buildApiError(response);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new GithubApiError('GitHub API returned invalid JSON.', {
      status: response.status,
    });
  }
};

export const createGithubApiClient = (fetcher: GithubFetch = fetch): GithubApiClient => ({
  getUser: (username) => requestJson<GithubUser>(fetcher, `${GITHUB_BASE_URL}/users/${username}`),
  getRepositories: (username) =>
    requestJson<GithubRepositoryRecord[]>(fetcher, `${GITHUB_BASE_URL}/users/${username}/repos?per_page=100`),
  getPublicEvents: (username) =>
    requestJson<GithubEventRecord[]>(fetcher, `${GITHUB_BASE_URL}/users/${username}/events/public?per_page=30`),
  getRepositoryCommits: (fullName) =>
    requestJson<GithubCommitRecord[]>(fetcher, `${GITHUB_BASE_URL}/repos/${fullName}/commits?per_page=3`),
});
