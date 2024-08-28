'use client'; // Ensure this component is client-side rendered

import Image from 'next/image';
import Projects from './components/project';
import Contact from './components/contact';
import BlogPage from './blog/page';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import Aboutme from './components/aboutme';
import Techstack from './components/techstack';

export default function Home() {
  const [typewriterStarted, setTypewriterStarted] = useState(false);

  useEffect(() => {
    // Trigger this effect when the typewriter starts
    const timer = setTimeout(() => {
      setTypewriterStarted(true);
    }, 100); // Adjust timing as necessary

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      {/* Hero Section */}
      <section className="mx-12 my-16 min-h-fit rounded-xl bg-base-100 p-12">
        <div className="flex flex-col items-start gap-12">
          {/* Image on Top */}
          <div className="flex-none">
            <Image
              src="/jasper.jpg"
              alt="Profile Picture"
              className="rounded-full shadow-lg"
              width={150}
              height={150}
            />
          </div>

          {/* Typewriter text below the image */}
          <div className="text-left text-4xl font-bold tracking-tight text-base-content">
            <span className="mb-2 block text-6xl text-primary">Hi.</span>
            <div className="inline-block" style={{ minWidth: '210px', minHeight: '60px' }}>
              <Typewriter
                options={{
                  strings: ["I'm Jasper", 'Welcome'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                  cursor: '', // Disable cursor blinking
                }}
              />
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-left text-base-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellat sapiente provident,
          voluptatem temporibus illo quod, voluptates reprehenderit aliquam enim nisi eaque
          laudantium doloreque esse!
        </p>
      </section>

      {/* TechStack Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content">
        <Techstack />
      </section>

      {/* Projects Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content">
        <Projects />
      </section>

      {/* Contact Me Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content">
        <Contact />
      </section>

      {/* Blog Section */}
      {/* <section className="bg-base-200 p-8 text-base-content"> */}
      <BlogPage />
      {/* </section> */}
    </main>
  );
}
