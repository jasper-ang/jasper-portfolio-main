/**
 * This module defines all HTTP methods (GET, POST, PATCH, DELETE) related to blog operations.
 * It interacts with the API to fetch, create, update, and delete blog data.
 * These logics are then abstracted into the useBlog hook for ease of use throughout the application.
 *
 * Functions:
 * - fetchBlogPosts: Retrieves all blog posts from the API.
 * - fetchBlogPostBySlug: Fetches a single blog post by its slug.
 * - createBlogPost: Creates a new blog post.
 * - updateBlogPost: Updates an existing blog post.
 * - deleteBlogPost: Deletes a blog post by its slug.
 */

// Define the Blog object type
export interface Blog {
  _id?: string;
  title: string;
  content: string;
}

// Fetch all blog posts
export async function fetchBlogPosts(): Promise<Blog[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL) {
    console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined.');
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/record`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<Blog> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  {
    const res = await fetch(`${API_URL}/record/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch the blog post');
    return await res.json();
  }
}

// Create a new blog post
export async function createBlogPost(blog: Blog): Promise<Blog | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL) {
    console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined.');
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to create blog post');
    return await res.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

// Update an existing blog post
export async function updateBlogPost(blog: Blog): Promise<Blog | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL || !blog._id) {
    console.error('Error: API URL or Blog slug is not defined.');
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/record/${blog._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to update blog post');
    return await res.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

// Delete a blog post by slug
export async function deleteBlogPost(slug: string): Promise<boolean> {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record/${slug}`;

  if (!API_URL || !slug) {
    console.error('Error: API URL or Blog slug is not defined.');
    return false;
  }

  try {
    const res = await fetch(API_URL, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete blog post');
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}
