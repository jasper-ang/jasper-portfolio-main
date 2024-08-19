'use client';

import { Blog } from '@/app/api/blogfetch';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost(): Promise<void> {
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${params.slug}`;
      console.log('url:', API_URL);
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
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="rounded bg-red-100 p-6 text-red-700 shadow-md dark:bg-red-800 dark:text-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="text-lg text-[#e5e7eb]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e7eb]">
      <div className="mx-auto max-w-2xl p-8 md:p-12 lg:p-16">
        <h1 className="mb-8 text-4xl font-extrabold leading-tight text-[#e5e7eb]">{blog.title}</h1>
        <div className="prose prose-lg dark:prose-invert leading-relaxed text-[#e5e7eb]">
          {blog.content}
        </div>
      </div>
    </div>
  );
}
