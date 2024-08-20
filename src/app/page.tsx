import Image from 'next/image';
import Head from 'next/head';
import Projects from './components/project';
import Contact from './components/contact';
import BlogList from './blog/page';
import Link from 'next/link';
import { Blog, fetchBlogPosts } from './api/blogfetch';
import BlogPage from './blog/page';

export default async function Home() {
  const posts: Blog[] = await fetchBlogPosts();
  console.log('Fetched Posts:', posts);
  return (
    <>
      <Head>
        <title>Jasper Portfolio</title>
        <meta
          name="description"
          content="Jasper's personal portfolio showcasing projects and skills."
        />
      </Head>
      <main className="bg-base-100 text-base-content min-h-screen">
        {/* Hero Section */}
        <section className="p-8 text-center">
          <h1 className="mb-6 text-5xl font-bold">Jasper Portfolio</h1>
          <div className="mb-6 flex justify-center">
            <Image
              src="/jasper.jpg"
              alt="Profile Picture"
              className="rounded-full"
              width={150}
              height={150}
            />
          </div>
          <p className="flex-right mx-auto mb-4 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellat sapiente
            provident, voluptatem temporibus illo quod, voluptates reprehenderit aliquam enim nisi
            eaque laudantium doloreque esse!
          </p>
          <p className="mx-auto mb-4 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nemo provident est
            ipsam, non impedit delectus voluptatem soluta, maxime ad obcaecati minus autem
            temporibus veritatis facere! Saepe aliquam quasi nihil?
          </p>
        </section>

        {/* About Me Section */}
        <section className="bg-base-100 text-base-content p-8">
          <h2 className="mb-4 text-3xl font-bold">About Me</h2>
          <p>This is the about section.</p>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Contact Me Section */}
        <Contact />

        {/* Blog Section */}
        <section className="bg-base-100 text-base-content p-8">
          <BlogPage />
        </section>
      </main>
    </>
  );
}
