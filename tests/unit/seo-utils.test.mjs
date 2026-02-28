import assert from 'node:assert/strict';
import test from 'node:test';

import { SITE_URL, absoluteUrl, createPageMetadata } from '../../lib/seo.ts';

test('absoluteUrl normalizes route path', () => {
  assert.equal(absoluteUrl('/portfolio'), `${SITE_URL}/portfolio`);
  assert.equal(absoluteUrl('portfolio'), `${SITE_URL}/portfolio`);
  assert.equal(absoluteUrl('/'), `${SITE_URL}/`);
});

test('createPageMetadata provides per-route canonical', () => {
  const metadata = createPageMetadata({
    path: '/portfolio',
    title: 'Portfolio',
    description: 'Portfolio description',
  });

  assert.equal(metadata.alternates?.canonical, '/portfolio');
  assert.equal(metadata.openGraph?.url, `${SITE_URL}/portfolio`);
  assert.equal(metadata.robots?.index, true);
});

test('createPageMetadata supports noindex pages', () => {
  const metadata = createPageMetadata({
    path: '/draft',
    title: 'Draft',
    description: 'Draft page',
    noIndex: true,
  });

  assert.equal(metadata.robots?.index, false);
  assert.equal(metadata.robots?.follow, false);
});
