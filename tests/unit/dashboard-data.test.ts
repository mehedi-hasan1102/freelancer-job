import assert from 'node:assert/strict';
import test from 'node:test';

import { GithubApiError, type GithubApiClient } from '../../lib/services/github-api.ts';
import { loadDashboardData } from '../../app/features/dashboard/services/loadDashboardData.ts';

const createMockApi = (
  overrides: Partial<GithubApiClient> = {},
): GithubApiClient => ({
  getUser: async () => ({
    name: 'Mehedi Hasan',
    bio: 'Developer',
    followers: 10,
    public_repos: 5,
  }),
  getRepositories: async () => [
    {
      id: 1,
      name: 'portfolio',
      full_name: 'mehedi/portfolio',
      description: 'Portfolio project',
      language: 'TypeScript',
      stargazers_count: 7,
      forks_count: 2,
      html_url: 'https://github.com/mehedi/portfolio',
      pushed_at: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'api',
      full_name: 'mehedi/api',
      description: null,
      language: null,
      stargazers_count: 3,
      forks_count: 1,
      html_url: 'https://github.com/mehedi/api',
      pushed_at: '2026-01-02T00:00:00.000Z',
    },
  ],
  getPublicEvents: async () => [
    {
      type: 'PushEvent',
      repo: { name: 'mehedi/portfolio' },
      created_at: '2026-01-03T00:00:00.000Z',
      payload: {
        commits: [{ sha: 'abc123456789', message: 'feat: improve navbar' }],
      },
    },
  ],
  getRepositoryCommits: async () => [
    {
      sha: 'fallback123456',
      html_url: 'https://github.com/mehedi/api/commit/fallback123456',
      commit: {
        message: 'fix: fallback commit',
        author: { date: '2026-01-01T00:00:00.000Z' },
      },
    },
  ],
  ...overrides,
});

test('loadDashboardData returns expected shaped data for success path', async () => {
  const data = await loadDashboardData('mehedi-hasan1102', createMockApi());

  assert.equal(data.userProfile.name, 'Mehedi Hasan');
  assert.equal(data.stats.stars, 10);
  assert.equal(data.stats.forks, 3);
  assert.equal(data.projects.length, 2);
  assert.equal(data.latestCommits.length >= 1, true);
  assert.equal(data.latestCommitError, null);
});

test('loadDashboardData sets rate-limit message when events endpoint is rate limited', async () => {
  const rateLimitedApi = createMockApi({
    getPublicEvents: async () => {
      throw new GithubApiError('rate limit', { status: 403, rateLimited: true });
    },
    getRepositoryCommits: async () => {
      throw new GithubApiError('rate limit', { status: 403, rateLimited: true });
    },
  });

  const data = await loadDashboardData('mehedi-hasan1102', rateLimitedApi);

  assert.equal(data.latestCommits.length, 0);
  assert.match(data.latestCommitError ?? '', /rate limit/i);
});

test('loadDashboardData bubbles hard failures from required endpoints', async () => {
  const failingApi = createMockApi({
    getUser: async () => {
      throw new GithubApiError('Network request to GitHub API failed.');
    },
  });

  await assert.rejects(() => loadDashboardData('mehedi-hasan1102', failingApi));
});
