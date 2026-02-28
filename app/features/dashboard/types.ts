export interface DashboardProject {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url?: string;
}

export interface GithubStats {
  stars: number;
  forks: number;
  followers: number;
  repos: number;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

export interface GithubRepository {
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

export interface GithubEventCommit {
  sha: string;
  message: string;
}

export interface GithubEvent {
  type: string;
  repo?: {
    name: string;
  };
  created_at?: string;
  payload?: {
    commits?: GithubEventCommit[];
  };
}

export interface GithubCommitResponse {
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

export interface LatestCommit {
  sha: string;
  message: string;
  repoName: string;
  committedAt: string;
  commitUrl: string;
}
