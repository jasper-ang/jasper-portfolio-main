'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Blog } from '@/app/api/blogfetch';
import { useBlog } from '@/app/hooks/useBlog';

// Dynamically import CustomEditor with SSR disabled
const CustomEditor = dynamic(() => import('@/app/components/CustomEditor'), { ssr: false });

const CreateNew: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { createBlog } = useBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog: Blog = {
      title,
      content,
    };

    try {
      const createdBlog = await createBlog(newBlog);

      if (createdBlog && createdBlog._id) {
        setSuccessMessage('Blog post created successfully!');
        if (typeof window !== 'undefined') {
          window.location.href = `/blog/${createdBlog._id}`;
        }
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <section className="flex min-h-screen justify-center bg-base-200 p-10">
      <div className="w-full max-w-2xl space-y-8">
        <h2 className="py-2 text-center text-4xl font-extrabold text-base-content">
          Create New Blog Post
        </h2>
        {successMessage && (
          <div className="alert alert-success shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2l4-4m5 2a9 9 0 11-6 6a9 9 0 016-6z"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="card w-full max-w-2xl space-y-8 bg-base-100 p-10 shadow-2xl"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="input input-md input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Content</span>
            </label>
            <CustomEditor value={content} onChange={value => setContent(value)} />
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateNew;
