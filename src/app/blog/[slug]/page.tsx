'use client';

import { Blog } from '@/app/api/blogfetch';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  });

export default function Page({ params }: { params: { slug: string } }) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${params.slug}`;
  const { data: blog, error } = useSWR<Blog>(API_URL, fetcher, {
    revalidateOnFocus: false,
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);
  const handleEdit = () => {
    if (blog) {
      setIsEditing(true);
      setEditedBlog(blog);
    }
  };

  const handleSave = async () => {
    if (!editedBlog) return;

    try {
      const res = await fetch(API_URL, {
        method: 'PATCH', // Use 'PATCH' as your backend expects partial updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBlog),
      });
      if (!res.ok) throw new Error('Failed to update blog post');

      // Mutate the cache to reflect the updated blog post
      mutate(API_URL);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete blog post');

      // Remove the deleted blog post from the cache
      mutate(API_URL, null, false); // Pass null to remove it from the cache

      // Redirect to the blog listing page
      router.replace('/blog');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      // Handle error state if necessary
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="rounded-lg bg-error p-6 text-error-content shadow-lg">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="text-lg text-primary-content">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="mx-auto max-w-2xl p-8 md:p-12 lg:p-16">
        <h1 className="mb-8 text-4xl font-extrabold leading-tight text-base-content">
          {blog.title}
        </h1>
        <div className="prose prose-lg leading-relaxed text-base-content dark:prose-invert">
          {blog.content}
        </div>
        <button className="btn btn-outline btn-primary mt-8" onClick={handleEdit}>
          Edit Post
        </button>
        <button
          className="btn btn-outline btn-secondary ml-4 mt-8"
          onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement).showModal()}
        >
          Delete Post
        </button>
      </div>

      {/* Modal for Editing */}
      {isEditing && (
        <dialog id="edit_modal" className="modal" open>
          <div className="modal-box mx-auto mt-16 w-full max-w-lg">
            <h3 className="text-lg font-bold">Edit Blog Post</h3>
            <form
              className="py-4"
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="label">Title</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={editedBlog?.title || ''}
                  onChange={e => setEditedBlog({ ...editedBlog!, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="label">Content</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={10}
                  value={editedBlog?.content || ''}
                  onChange={e => setEditedBlog({ ...editedBlog!, content: e.target.value })}
                />
              </div>
              <div className="modal-action">
                <button className="btn btn-outline btn-primary" type="submit">
                  Save
                </button>
                <button className="btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Modal for delete */}
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
