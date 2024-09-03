'use client';

import Projects from './components/project';
import Contact from './components/contact';
import BlogPage from './blog/page';
import { RefObject, useEffect, useRef, useState } from 'react';
import Techstack from './components/techstack';
import Hero from './components/hero';

export default function Home() {
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const contactRef: RefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setTypewriterStarted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      <Hero scrollToContact={scrollToContact} />

      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4">
        <Techstack />
      </section>

      <section className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4">
        <Projects />
      </section>

      <section
        ref={contactRef}
        className="mx-4 my-12 bg-base-200 p-8 text-base-content sm:mx-2 sm:my-8 sm:p-4"
      >
        <Contact />
      </section>

      <BlogPage />
    </main>
  );
}
