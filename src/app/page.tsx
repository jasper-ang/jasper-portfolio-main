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
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    // Trigger this effect when the typewriter starts
    const timer = setTimeout(() => {
      setTypewriterStarted(true);
    }, 100); // Adjust timing as necessary

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      {/* Hero Section */}
      <section className="mx-12 my-12 min-h-fit rounded-xl bg-base-100 p-12 shadow-xl sm:mx-8 sm:my-8 sm:p-6">
        <div className="flex flex-col items-start gap-10 sm:gap-6">
          {/* Image on Top */}
          <div className="flex-none">
            <Image
              src="/jasper.jpg"
              alt="Profile Picture"
              className="rounded-full shadow-lg"
              width={130}
              height={130}
            />
          </div>

          {/* Typewriter text below the image */}
          <div className="text-left text-4xl font-bold tracking-tight text-base-content sm:text-3xl">
            <span className="mb-2 block text-6xl text-primary sm:text-5xl">Hi.</span>
            <div
              className="inline-block overflow-hidden align-top"
              style={{ minWidth: '180px', minHeight: '50px' }}
            >
              <Typewriter
                options={{
                  strings: ["I'm Jasper", 'Welcome'],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 60,
                  cursor: '', // Disable cursor blinking
                }}
                onInit={typewriter => {
                  const typewriterContainer = document.querySelector(
                    '.typewriter-container'
                  ) as HTMLElement;
                  if (typewriterContainer) {
                    typewriterContainer.style.visibility = 'visible';
                  }
                  typewriter.start();
                }}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left text-sm text-base-content sm:mt-3 sm:max-w-xl sm:space-y-3 sm:text-xs">
          <p className="border-l-4 border-primary pl-4 font-semibold">
            I’m a full-stack developer, but I didn’t started out that way
          </p>
          <p className="border-l-4 border-secondary pl-4">
            During my MBA, I found myself <span className="underline">building projects</span>, and
            eventually fell in love with it. I started out with a{' '}
            <span className="italic">Wix site</span>, then <span className="italic">Figma</span> and{' '}
            <span className="italic">StackBlitz</span>, and later do you know, I am hosting a
            full-stack app. <span className="font-semibold">This is my first baby</span>
          </p>
          <p className="border-l-4 border-accent pl-4">
            There’s something incredibly satisfying about spending hours on a project and seeing it
            come to life. <span className="underline">That’s what I love doing</span>
          </p>
        </div>
      </section>

      {/* TechStack Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4">
        <Techstack />
      </section>

      {/* Projects Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4">
        <Projects />
      </section>

      {/* Contact Me Section */}
      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4">
        <Contact />
      </section>

      {/* Blog Section */}
      {/* <section className="bg-base-200 p-8 text-base-content"> */}
      <BlogPage />
      {/* </section> */}
    </main>
  );
}
