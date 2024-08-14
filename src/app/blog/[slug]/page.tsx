'use client';

import { useEffect, useState } from 'react';
import { Blog } from '@/app/page';

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost(): Promise<void> {
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}${params.slug}`;
      try {
        const res = await fetch(API_URL, {
          cache: 'no-store', // Disable caching for fresh data
        });
        if (!res.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data: Blog = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to fetch blog post');
      }
    }

    fetchBlogPost();
  }, [params.slug]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="rounded-lg bg-red-100 p-4 text-red-700 shadow-md dark:bg-red-800 dark:text-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {blog.title}
        </h1>
        <div className="prose dark:prose-invert prose-lg">{blog.content}</div>
      </div>
    </div>
  );
}
