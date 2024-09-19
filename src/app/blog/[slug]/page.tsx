// blog/[slug]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Blog } from '@/app/api/blogfetch';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/authentication';
import { useBlog } from '@/app/hooks/useBlog';
import Modal from '@/app/components/modal';
import CustomEditor from '@/app/components/CustomEditor';
import sanitizeHtml from 'sanitize-html';

interface EditModalProps {
  blog: Blog;
  isOpen: boolean;
  onSave: (updatedBlog: Blog) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ blog, isOpen, onSave, onClose }) => {
  const [localBlog, setLocalBlog] = useState(blog);

  useEffect(() => {
    setLocalBlog(blog);
  }, [blog]);

  const handleInputChange = (field: keyof Blog, value: string) => {
    setLocalBlog({ ...localBlog, [field]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localBlog);
  };

  return (
    <Modal
      id="edit_modal"
      title="Edit Blog Post"
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <button className="btn btn-outline btn-primary" type="submit" form="edit_form">
          Save
        </button>
      }
    >
      <form id="edit_form" className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            className="input input-bordered w-full"
            type="text"
            value={localBlog.title}
            onChange={e => handleInputChange('title', e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Content</span>
          </label>
          <CustomEditor
            value={localBlog.content}
            onChange={value => handleInputChange('content', value)}
          />
        </div>
      </form>
    </Modal>
  );
};

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onDelete, onClose }) => {
  return (
    <Modal
      id="delete_modal"
      title="Confirm Deletion"
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <button className="btn btn-error" onClick={onDelete}>
          Confirm
        </button>
      }
    >
      <p>Are you sure you want to delete this blog post?</p>
    </Modal>
  );
};

export default function Page({ params }: { params: { slug: string } }) {
  const { singlePost, error, updateBlog, deleteBlog } = useBlog(params.slug);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (singlePost && singlePost.title) {
      document.title = singlePost.title;
    }
  }, [singlePost]);

  const handleEdit = () => {
    if (singlePost) {
      setIsEditing(true);
      setEditedBlog(singlePost);
    }
  };

  const handleSave = async (updatedBlog: Blog) => {
    if (!updatedBlog) return;

    try {
      await updateBlog(updatedBlog);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(params.slug);
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

  if (!singlePost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="text-lg text-primary-content">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="mx-auto max-w-2xl p-12 sm:p-8">
        <h1 className="mb-8 text-4xl font-semibold leading-tight text-base-content">
          {singlePost.title}
        </h1>
        <div
          className="prose prose-lg leading-relaxed text-base-content dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(singlePost.content) }}
        ></div>

        {user?.role === 'admin' && (
          <>
            <button className="btn btn-outline btn-primary mt-8" onClick={handleEdit}>
              Edit Post
            </button>
            <button
              className="btn btn-outline btn-secondary ml-4 mt-8"
              onClick={() => setIsDeleting(true)}
            >
              Delete Post
            </button>
          </>
        )}
      </div>

      {isEditing && editedBlog && (
        <EditModal
          blog={editedBlog}
          isOpen={isEditing}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
      <DeleteModal
        isOpen={isDeleting}
        onDelete={handleDelete}
        onClose={() => setIsDeleting(false)}
      />
    </div>
  );
}
