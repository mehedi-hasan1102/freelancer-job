'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiSearch, FiX } from 'react-icons/fi';
import { BlogCard } from './BlogCard';

type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
};

type BlogListingProps = {
  posts: BlogListItem[];
  initialQuery: string;
  initialPage: number;
};

const POSTS_PER_PAGE = 6;

const getPageNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, -1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      -1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
};

export const BlogListing = ({
  posts,
  initialQuery,
  initialPage,
}: BlogListingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(
    Number.isFinite(initialPage) && initialPage > 0 ? Math.floor(initialPage) : 1
  );

  const normalizedQuery = query.trim().toLowerCase();

  const syncUrl = (nextQuery: string, nextPage: number) => {
    const params = new URLSearchParams();
    const cleanQuery = nextQuery.trim();

    if (cleanQuery) {
      params.set('q', cleanQuery);
    }

    if (nextPage > 1) {
      params.set('page', String(nextPage));
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const searchableText = [post.title, post.excerpt, ...(post.tags ?? [])]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [posts, normalizedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const start = (activePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);
  const pageNumbers = getPageNumbers(activePage, totalPages);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 min-[769px]:mb-10 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
        <div className="relative w-full min-[769px]:max-w-[520px]">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <FiSearch
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] text-[var(--text-secondary)]"
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQuery(nextQuery);
              setCurrentPage(1);
              syncUrl(nextQuery, 1);
            }}
            placeholder="Search by title, excerpt, or tag..."
            className="h-12 w-full rounded-[14px] border border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.08)] pl-11 pr-11 text-[0.95rem] text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:bg-[rgba(var(--accent-rgb),0.12)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCurrentPage(1);
                syncUrl('', 1);
              }}
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[rgba(var(--accent-rgb),0.2)] hover:text-[var(--text)]"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          ) : null}
        </div>

        <p className="text-[0.9rem] text-[var(--text-secondary)]">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="p-8 text-center text-[var(--text-secondary)] [grid-column:1/-1]">
          No posts yet. Add MDX files under content/blog.
        </p>
      ) : paginatedPosts.length === 0 ? (
        <div className="rounded-[20px] border border-[rgba(var(--accent-rgb),0.2)] bg-[rgba(var(--accent-rgb),0.06)] p-8 text-center">
          <p className="mb-4 text-[var(--text-secondary)]">
            No articles matched <span className="text-[var(--text)]">&quot;{query}&quot;</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCurrentPage(1);
              syncUrl('', 1);
            }}
            className="rounded-[999px] border border-[var(--accent)] px-4 py-2 font-['Staatliches',serif] text-[0.9rem] tracking-[0.08em] text-[var(--accent)] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            CLEAR SEARCH
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3 min-[1025px]:gap-[clamp(1rem,2vw,1.5rem)]">
            {paginatedPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                index={start + index}
                animationIndex={index}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Blog pagination"
            >
              <button
                type="button"
                onClick={() => {
                  const nextPage = Math.max(1, activePage - 1);
                  setCurrentPage(nextPage);
                  syncUrl(query, nextPage);
                }}
                disabled={activePage === 1}
                className="inline-flex h-10 items-center gap-2 rounded-[999px] border border-[rgba(var(--accent-rgb),0.35)] px-4 text-[0.85rem] font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[rgba(var(--accent-rgb),0.12)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <FiChevronLeft size={16} /> Prev
              </button>

              {pageNumbers.map((pageNumber, index) =>
                pageNumber === -1 ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-10 w-10 items-center justify-center text-[var(--text-secondary)]"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      syncUrl(query, pageNumber);
                    }}
                    aria-current={activePage === pageNumber ? 'page' : undefined}
                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[0.88rem] font-semibold transition-colors duration-200 ${
                      activePage === pageNumber
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]'
                        : 'border-[rgba(var(--accent-rgb),0.35)] text-[var(--text)] hover:bg-[rgba(var(--accent-rgb),0.12)]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => {
                  const nextPage = Math.min(totalPages, activePage + 1);
                  setCurrentPage(nextPage);
                  syncUrl(query, nextPage);
                }}
                disabled={activePage === totalPages}
                className="inline-flex h-10 items-center gap-2 rounded-[999px] border border-[rgba(var(--accent-rgb),0.35)] px-4 text-[0.85rem] font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[rgba(var(--accent-rgb),0.12)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next <FiChevronRight size={16} />
              </button>
            </nav>
          ) : null}
        </>
      )}
    </>
  );
};
