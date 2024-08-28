/**
 * Custom hook `useBlog` to manage blog data with API interactions.
 *
 * The function of this hook is as followed:
 * - This hook provides data and function to create, update, and delete blog posts.
 * - This hook use SWR to cache and revalidate states
 * - Creates a seperate of concern between the fetching logic with caching/revalidation
 * - Encapsulate all functions into a single useBlog function
 *
 * Functions and Data Returned:
 * - `singlePost`: Fetches and returns a single blog post by slug.
 * - `allPosts`: Fetches and returns all blog posts.
 * - `createBlog`: Function to create a new blog post.
 * - `updateBlog`: Function to update an existing blog post.
 * - `deleteBlog`: Function to delete a blog post by slug.
 * - `error`: Combines errors from both single post and all posts fetch operations.
 * - `API_URL_SLUG`: The API endpoint URL for the blog post, determined by the slug.
 */

import {
  Blog,
  fetchBlogPosts,
  fetchBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '@/app/api/blogfetch';
import useSWR, { mutate } from 'swr';

// Hook to manage blog data
export const useBlog = (slug?: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/record`;

  // Generate the API URL for a specific slug
  const API_URL_SLUG = slug ? `${API_URL}/${slug}` : API_URL;

  // Fetch a single blog post using SWR
  const { data: singlePost, error: singlePostError } = useSWR<Blog>(
    slug ? `${API_URL}/${slug}` : null,
    () => fetchBlogPostBySlug(slug!)
  );

  // Fetch all blog posts using SWR
  const { data: allPosts, error: allPostsError } = useSWR<Blog[]>(
    !slug ? API_URL : null,
    fetchBlogPosts
  );

  // Create new blog post
  const createBlog = async (newBlog: Blog): Promise<Blog | null> => {
    try {
      const createdBlog = await createBlogPost(newBlog);
      mutate(API_URL); // Revalidate the SWR cache for all posts
      return createdBlog; // Return the created blog
    } catch (err) {
      console.error('Failed to create blog', err);
      return null; // Return null in case of an error
    }
  };

  // Update blog post
  const updateBlog = async (updatedBlog: Blog) => {
    try {
      await updateBlogPost(updatedBlog);
      mutate(`${API_URL}/${updatedBlog._id}`); // Revalidate the SWR cache for the specific blog post
    } catch (err) {
      console.error('Failed to update blog', err);
    }
  };

  // Delete blog post
  const deleteBlog = async (slug: string) => {
    if (singlePost?._id) {
      try {
        await deleteBlogPost(singlePost._id);
        mutate(`${API_URL}/${singlePost._id}`, null, false); // Remove the deleted blog post from the SWR cache
      } catch (err) {
        console.error('Failed to delete blog', err);
      }
    }
  };

  return {
    singlePost,
    allPosts,
    error: singlePostError || allPostsError,
    API_URL_SLUG,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};
