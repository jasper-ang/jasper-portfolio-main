'use client';

import React, { useState } from 'react';
import { Blog, createBlogPost } from '@/app/api/blogfetch';

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
    <section className="bg-base-200 flex min-h-screen items-center justify-center p-10">
      <div className="w-full max-w-2xl space-y-8">
        <h2 className="text-base-content text-center text-4xl font-extrabold">
          Create New Blog Post
        </h2>
        {successMessage && (
          <p className="text-success text-center text-lg font-semibold">{successMessage}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 w-full max-w-2xl space-y-8 p-10 shadow-2xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <div>
            <textarea
              name="content"
              placeholder="Write your blog content here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              className="textarea textarea-bordered h-48 w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNew;
