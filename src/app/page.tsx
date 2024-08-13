// src/app/page.tsx

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Projects from './components/project';
import Contact from './components/contact';
import BlogComponent from './components/blog';

// Define the Blog object type
export interface Blog {
  _id?: string;
  title: string;
  content: string;
}

async function fetchBlogPosts(): Promise<Blog[]> {
  const API_URL = 'https://portfolio-backend-j7e4.onrender.com/record/';
  try {
    const res = await fetch(API_URL, {
      cache: 'no-store', // Disable caching for fresh data
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

export default async function Home() {
  const posts = await fetchBlogPosts();

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
              src="/jasper.jpg"
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
          <div>
            <h1>My Blog</h1>
            <BlogComponent posts={posts} />
          </div>
        </section>
      </main>
    </>
  );
}
