'use client';

import { useEffect } from 'react';
import { fetchBlogPosts } from './api/blogfetch';

const Apitest = () => {
  useEffect(() => {
    const getData = async () => {
      const posts = await fetchBlogPosts();
      console.log('Fetched posts:', posts);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Check the console logs for API responses</h1>
    </div>
  );
};

export default Apitest;
