'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/authentication';
import { useBlog } from '../hooks/useBlog'; // Adjust this import path as necessary

export default function BlogPage() {
  const { user } = useAuth(); // Get the current user from the authentication context
  const { allPosts, error } = useBlog(); // Use useBlog hook to fetch all blog posts

  if (error) return <div className="mt-8 text-center text-error">Error loading posts.</div>;
  if (!allPosts) return <div className="mt-8 text-center text-info">Loading...</div>;

  return (
    <div id="blog" className="bg-base-300 p-8 text-base-content">
      <div className="mx-auto mb-8 max-w-2xl p-8">
        <h2 className="mb-8 text-left text-3xl font-bold">My Blog</h2>

        {user?.role === 'admin' && (
          <div className="mb-6 flex justify-start">
            <Link href="/blog/newblogpost" className="btn btn-ghost btn-outline">
              New Page
            </Link>
          </div>
        )}

        <div className="rounded-lg bg-base-100 p-6 shadow-lg">
          <ul className="divide-y divide-neutral">
            {allPosts.map(post => (
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
