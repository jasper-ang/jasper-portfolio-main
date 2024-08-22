'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Blog, fetchBlogPosts } from '../api/blogfetch';

export default function BlogPage() {
  // Use SWR to fetch the blog posts
  const { data: posts, error } = useSWR<Blog[]>('/record', fetchBlogPosts);

  if (error) return <div className="text-error mt-8 text-center">Error loading posts.</div>;
  if (!posts) return <div className="text-info mt-8 text-center">Loading...</div>;

  return (
    <div id="blog" className="bg-base-200 text-base-content p-8">
      <div className="mx-auto mb-8 max-w-2xl">
        <h2 className="mb-8 text-left text-4xl font-bold">My Blog</h2>

        <div className="mb-6 flex justify-start">
          <Link href="/blog/newblogpost" className="btn btn-outline btn-ghost">
            New Page
          </Link>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <ul className="divide-neutral divide-y">
            {posts.map(post => (
              <li key={post._id} className="py-4">
                <Link
                  href={`/blog/${post._id}`}
                  className="text-base-content text-sm font-semibold hover:underline"
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
