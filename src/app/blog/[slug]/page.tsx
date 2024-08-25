'use client';

import { Blog } from '@/app/api/blogfetch';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/contexts/authentication';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const useBlog = (slug: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${slug}`;
  const { data: blog, error } = useSWR<Blog>(API_URL, fetcher, { revalidateOnFocus: false });
  return { blog, error, API_URL };
};

const EditModal = ({ blog, onSave, onCancel }: any) => (
  <dialog id="edit_modal" className="modal" open>
    <div className="modal-box mx-auto mt-16 w-full max-w-lg">
      <h3 className="text-lg font-bold">Edit Blog Post</h3>
      <form
        className="py-4"
        onSubmit={e => {
          e.preventDefault();
          onSave();
        }}
      >
        <div className="mb-4">
          <label className="label">Title</label>
          <input
            className="input input-bordered w-full"
            type="text"
            value={blog.title}
            onChange={e => onSave({ ...blog, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="label">Content</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={10}
            value={blog.content}
            onChange={e => onSave({ ...blog, content: e.target.value })}
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-outline btn-primary" type="submit">
            Save
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </dialog>
);

const DeleteModal = ({ onDelete, onCancel }: any) => (
  <dialog id="delete_modal" className="modal">
    <div className="modal-box">
      <h3 className="text-lg font-bold">Confirm Deletion</h3>
      <p className="py-4">Are you sure you want to delete this blog post?</p>
      <div className="modal-action">
        <button className="btn btn-error" onClick={onDelete}>
          Confirm
        </button>
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </dialog>
);

export default function Page({ params }: { params: { slug: string } }) {
  const { blog, error, API_URL } = useBlog(params.slug);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);
  const { user } = useAuth(); // Access the authentication context

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
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBlog),
      });
      if (!res.ok) throw new Error('Failed to update blog post');
      mutate(API_URL);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(API_URL, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog post');
      mutate(API_URL, null, false);
      router.replace('/blog');
    } catch (error) {
      console.error('Error deleting blog post:', error);
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

        {/* Render Edit and Delete buttons only if the user is an admin */}
        {user?.role === 'admin' && (
          <>
            <button className="btn btn-outline btn-primary mt-8" onClick={handleEdit}>
              Edit Post
            </button>
            <button
              className="btn btn-outline btn-secondary ml-4 mt-8"
              onClick={() =>
                (document.getElementById('delete_modal') as HTMLDialogElement).showModal()
              }
            >
              Delete Post
            </button>
          </>
        )}
      </div>

      {isEditing && (
        <EditModal blog={editedBlog} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      )}
      <DeleteModal
        onDelete={handleDelete}
        onCancel={() => (document.getElementById('delete_modal') as HTMLDialogElement).close()}
      />
    </div>
  );
}
