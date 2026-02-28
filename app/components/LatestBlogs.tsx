import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '../blog/BlogCard';

export default function LatestBlogs() {
  const posts = getAllPosts().slice(0, 3);
  const orbBaseClass =
    'pointer-events-none absolute rounded-full opacity-40 blur-[120px]';

  return (
    <section
      className="relative min-h-screen overflow-hidden py-32 max-[768px]:py-16"
      style={{ background: 'var(--bg)' }}
    >
      <div
        className={`${orbBaseClass} left-[-8%] top-[8%] h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(34,211,238,0.15),transparent_70%)]`}
      />
      <div
        className={`${orbBaseClass} right-[-12%] top-[55%] h-[460px] w-[460px] bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]`}
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-8 max-[480px]:px-4">
        <div className="mb-20 overflow-hidden text-center max-[768px]:mb-12">
          <h2 className="sectionTitleGlobal">
            LATEST <span style={{ color: 'var(--accent)' }}>BLOGS</span>
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="p-8 text-center text-[var(--text-secondary)]">
            No posts yet. Add MDX files under content/blog.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3 min-[1025px]:gap-[clamp(1rem,2vw,1.5rem)]">
            {posts.map((post, index) => (
              <BlogCard
                key={post.meta.slug}
                slug={post.meta.slug}
                title={post.meta.title}
                excerpt={post.meta.excerpt}
                date={post.meta.date}
                tags={post.meta.tags}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link href="/blog" className="btn-primary">
            <FiArrowUpRight size={16} />
            <span>VIEW ALL BLOGS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
