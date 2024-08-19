'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Blog, createBlogPost } from '@/app/api/blogfetch';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateNew: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog: Blog = {
      title,
      content,
    };

    try {
      const createdBlog = await createBlogPost(newBlog);

      if (createdBlog) {
        setSuccessMessage('Blog post created successfully!');

        // Redirect to the loading page with the new post ID
        window.location.href = `/blog/${createdBlog._id}`;
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#1a1a1a] p-10 text-[#e5e7eb]">
      <div className="w-full max-w-2xl space-y-8">
        <h2 className="text-center text-4xl font-extrabold text-[#c9d1d9]">Create New Blog Post</h2>
        {successMessage && (
          <p className="text-center text-lg font-semibold text-[#238636]">{successMessage}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex min-h-[500px] w-full max-w-2xl flex-col justify-between space-y-8 rounded-lg bg-[#0d1117] p-10 shadow-2xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-[#30363d] bg-[#c4c8cf] px-4 py-3 text-[#1a1a1a] placeholder-black placeholder-opacity-60 transition-colors focus:border-[#6d44c1] focus:outline-none"
          />
          <div>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
              className="h-auto min-h-max w-full rounded-lg border border-[#30363d] bg-[#c4c8cf] px-4 py-3 text-[#1a1a1a] placeholder-black placeholder-opacity-60 transition-colors focus:border-[#6d44c1] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#8b5cf6] px-4 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-opacity-50"
          >
            Create Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNew;
