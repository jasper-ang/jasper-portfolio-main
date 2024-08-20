'use client';

import { Blog } from '@/app/api/blogfetch';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Next.js router to handle redirects

  useEffect(() => {
    async function fetchBlogPost(): Promise<void> {
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${params.slug}`;
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

  // Function to handle the delete action
  async function handleDelete(): Promise<void> {
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${params.slug}`;
    try {
      const res = await fetch(API_URL, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete blog post');
      }
      // Short delay to ensure the server processes the deletion before redirecting
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect to blog listing page or handle the state after deletion
      router.replace('/blog');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setError('Failed to delete blog post');
    }
  }

  if (error) {
    return (
      <div className="bg-base-200 flex min-h-screen items-center justify-center">
        <div className="bg-error text-error-content rounded-lg p-6 shadow-lg">Error: {error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-base-200 flex min-h-screen items-center justify-center">
        <div className="text-primary-content text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <div className="mx-auto max-w-2xl p-8 md:p-12 lg:p-16">
        <h1 className="text-base-content mb-8 text-4xl font-extrabold leading-tight">
          {blog.title}
        </h1>
        <div className="prose prose-lg dark:prose-invert text-base-content leading-relaxed">
          {blog.content}
        </div>
        <button
          className="btn btn-secondary mt-8"
          onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement).showModal()}
        >
          Delete Post
        </button>
      </div>

      {/* Modal Code */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this blog post?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleDelete}>
              Confirm
            </button>
            <button
              className="btn"
              onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement).close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
