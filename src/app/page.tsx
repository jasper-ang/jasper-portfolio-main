'use client';

import Image from 'next/image';
import Head from 'next/head';
import jasperImage from '../../public/jasper.jpg';
import Projects from './components/project';
import Contact from './components/contact';
import BlogComponent, { Blog } from './components/blog';
import { useState } from 'react';

export default function Home({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Blog[]>([]);

  return (
    <>
      <Head>
        <title>Jasper Portfolio</title>
        <meta
          name="description"
          content="Jasper's personal portfolio showcasing projects and skills."
        />
      </Head>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="text-center p-8">
          <h1 className="text-5xl font-bold mb-6">Jasper Portfolio</h1>
          <div className="flex justify-center mb-6">
            <Image
              src={jasperImage}
              alt="Profile Picture"
              className="rounded-full"
              width={150}
              height={150}
            />
          </div>
          <p className="max-w-2xl mx-auto mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellat sapiente
            provident, voluptatem temporibus illo quod, voluptates reprehenderit aliquam enim nisi
            eaque laudantium doloreque esse!
          </p>
          <p className="max-w-2xl mx-auto mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nemo provident est
            ipsam, non impedit delectus voluptatem soluta, maxime ad obcaecati minus autem
            temporibus veritatis facere! Saepe aliquam quasi nihil?
          </p>
        </section>

        {/* About Me Section */}
        <section className="bg-[#2d333b] p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p>This is the about section.</p>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Contact Me Section */}
        <Contact />

        {/* Blog Section */}
        <section>
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
        </section>
      </main>
    </>
  );
}
