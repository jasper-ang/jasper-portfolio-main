import Image from 'next/image';
import Head from 'next/head';
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
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_URL) {
    console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined.');
    return [];
  }
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
      <main className="min-h-screen bg-[#1a1a1a] text-[#e5e7eb]">
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
        <section className="bg-[#1a1a1a] p-8 text-[#e5e7eb]">
          <h2 className="mb-4 text-3xl font-bold">About Me</h2>
          <p>This is the about section.</p>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Contact Me Section */}
        <Contact />

        {/* Blog Section */}
        <section className="bg-[#1a1a1a] p-8 text-[#e5e7eb]">
          <h2 className="mb-4 text-3xl font-bold">My Blog</h2>
          <BlogComponent posts={posts} />
        </section>
      </main>
    </>
  );
}
