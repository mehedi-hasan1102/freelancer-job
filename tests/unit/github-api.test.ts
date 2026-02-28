import assert from 'node:assert/strict';
import test from 'node:test';

import {
  GithubApiError,
  createGithubApiClient,
  type GithubFetch,
} from '../../lib/services/github-api.ts';

const jsonResponse = (payload: unknown, status = 200, headers?: Record<string, string>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  });

test('github api client returns typed user payload', async () => {
  const fetchMock: GithubFetch = async () =>
    jsonResponse({ name: 'Mehedi', followers: 2, public_repos: 3 });

  const client = createGithubApiClient(fetchMock);
  const user = await client.getUser('mehedi');

  assert.equal(user.name, 'Mehedi');
  assert.equal(user.followers, 2);
  assert.equal(user.public_repos, 3);
});

test('github api client throws rate-limit error when headers indicate exhausted limit', async () => {
  const fetchMock: GithubFetch = async () =>
    jsonResponse(
      { message: 'API rate limit exceeded' },
      403,
      { 'x-ratelimit-remaining': '0' },
    );

  const client = createGithubApiClient(fetchMock);

  await assert.rejects(
    () => client.getPublicEvents('mehedi'),
    (error: unknown) => {
      assert.ok(error instanceof GithubApiError);
      assert.equal(error.rateLimited, true);
      assert.equal(error.status, 403);
      return true;
    },
  );
});

test('github api client throws status errors for non-ok responses', async () => {
  const fetchMock: GithubFetch = async () => jsonResponse({ message: 'not found' }, 404);
  const client = createGithubApiClient(fetchMock);

  await assert.rejects(
    () => client.getRepositoryCommits('foo/bar'),
    (error: unknown) => {
      assert.ok(error instanceof GithubApiError);
      assert.equal(error.rateLimited, false);
      assert.equal(error.status, 404);
      return true;
    },
  );
});

test('github api client wraps network failures into GithubApiError', async () => {
  const fetchMock: GithubFetch = async () => {
    throw new Error('network down');
  };

  const client = createGithubApiClient(fetchMock);

  await assert.rejects(
    () => client.getRepositories('mehedi'),
    (error: unknown) => {
      assert.ok(error instanceof GithubApiError);
      assert.equal(error.message, 'Network request to GitHub API failed.');
      return true;
    },
  );
});
