import { NextApiRequest, NextApiResponse } from 'next';

// Define the Blog object type
export interface Blog {
  _id?: string;
  title: string;
  content: string;
}

// Fetch Blog data from API endpoint
export async function fetchBlogPosts() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL) {
    console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined.');
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/record`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Create a new Blog post by sending a POST request to the API
export async function createBlogPost(blog: Blog): Promise<Blog | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL) {
    console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined.');
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    if (!res.ok) {
      throw new Error('Failed to create blog post');
    }

    return res.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

// You can add more related API functions here
