import assert from 'node:assert/strict';
import test from 'node:test';

import { getPageNumbers, parsePageParam } from '../../app/features/portfolio/utils.ts';

test('parsePageParam returns 1 for invalid values', () => {
  assert.equal(parsePageParam(undefined), 1);
  assert.equal(parsePageParam('0'), 1);
  assert.equal(parsePageParam('-5'), 1);
  assert.equal(parsePageParam('abc'), 1);
});

test('parsePageParam floors positive decimals', () => {
  assert.equal(parsePageParam('3.8'), 3);
});

test('getPageNumbers returns full list when total pages <= 7', () => {
  assert.deepEqual(getPageNumbers(2, 5), [1, 2, 3, 4, 5]);
});

test('getPageNumbers returns compact window near start', () => {
  assert.deepEqual(getPageNumbers(2, 10), [1, 2, 3, 4, 5, -1, 10]);
});

test('getPageNumbers returns compact window near end', () => {
  assert.deepEqual(getPageNumbers(9, 10), [1, -1, 6, 7, 8, 9, 10]);
});

test('getPageNumbers returns compact window around middle', () => {
  assert.deepEqual(getPageNumbers(6, 12), [1, -1, 5, 6, 7, -1, 12]);
});
