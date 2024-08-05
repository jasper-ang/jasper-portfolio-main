'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import BlogComponent, { Blog } from '../components/blog';

export default function Blogpage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Blog[]>([]);

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className="min-h-screen">
        <BlogComponent setData={setData} setLoading={setIsLoading} />

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            Loading...
          </div>
        ) : (
          <div className="bg-gray-900 min-h-screen p-4">
            {data.length === 0 ? (
              <div className="text-center text-white">No blogs available</div>
            ) : (
              <div className="max-w-xl mx-auto space-y-4">
                {data.map(blog => (
                  <div
                    key={blog._id}
                    className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition w-full md:w-auto"
                  >
                    <h2 className="text-lg font-bold text-white truncate">{blog.title}</h2>
                    <p className="text-white mt-2">{blog.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
