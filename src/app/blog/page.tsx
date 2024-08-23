'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Blog, fetchBlogPosts } from '../api/blogfetch';

export default function BlogPage() {
  // Use SWR to fetch the blog posts
  const { data: posts, error } = useSWR<Blog[]>('/record', fetchBlogPosts);

  if (error) return <div className="mt-8 text-center text-error">Error loading posts.</div>;
  if (!posts) return <div className="mt-8 text-center text-info">Loading...</div>;

  return (
    <div id="blog" className="bg-base-200 p-8 text-base-content">
      <div className="mx-auto mb-8 max-w-2xl">
        <h2 className="mb-8 text-left text-4xl font-bold">My Blog</h2>

        <div className="mb-6 flex justify-start">
          <Link href="/blog/newblogpost" className="btn btn-ghost btn-outline">
            New Page
          </Link>
        </div>

        <div className="rounded-lg bg-base-100 p-6 shadow-lg">
          <ul className="divide-y divide-neutral">
            {posts.map(post => (
              <li key={post._id} className="py-4">
                <Link
                  href={`/blog/${post._id}`}
                  className="text-sm font-semibold text-base-content transition-colors duration-300 hover:text-primary"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
