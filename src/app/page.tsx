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
      <main className="min-h-screen bg-base-100 text-base-content">
        {/* Hero Section */}
        <section className="my-5 p-8 text-center">
          {/* <h1 className="p-8 text-5xl font-bold">Jasper Portfolio</h1> */}
          <div className="diff my-4 aspect-[16/9] shadow-2xl">
            <div className="diff-item-1">
              <div className="grid place-content-center bg-secondary text-7xl font-black text-primary-content">
                Welcome...
              </div>
            </div>
            <div className="diff-item-2">
              <div className="grid place-content-center bg-base-200 text-7xl font-black">
                Welcome...
              </div>
            </div>
            <div className="diff-resizer"></div>
          </div>
          <div className="flex justify-center p-8">
            <Image
              src="/jasper.jpg"
              alt="Profile Picture"
              className="rounded-full"
              width={150}
              height={150}
            />
          </div>
          <p className="mx-auto mb-4 max-w-2xl">
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
        <section className="bg-base-100 p-8 text-base-content">
          <h2 className="mb-4 text-3xl font-bold">About Me</h2>
          <p>This is the about section.</p>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Contact Me Section */}
        <Contact />

        {/* Blog Section */}
        <section className="bg-base-100 p-8 text-base-content">
          <BlogPage />
        </section>
      </main>
    </>
  );
}
