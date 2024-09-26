import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

const AvaChatButton = () => {
  const router = useRouter();

  const redirectToAva = () => {
    router.push('/avatar/options'); // Replace '/ava' with the actual path to your Ava page
  };

  return (
    <button onClick={redirectToAva} className="btn btn-ghost btn-xs flex items-center space-x-1">
      <MessageSquare size={16} />
      <span>
        Chat with <span className="font-semiboldbold text-primary">Ava</span>, my digital assistant
      </span>
    </button>
  );
};

export default function Hero({ scrollToContact }: { scrollToContact: () => void }) {
  return (
    <section className="mx-12 my-6 min-h-fit rounded-xl bg-base-200 p-12 shadow-xl sm:mx-8 sm:my-8 sm:p-6">
      <div className="flex flex-col items-start gap-4">
        <div className="mb-2 flex items-center gap-16 sm:gap-4">
          <Image
            src="/jasper.jpg"
            alt="Profile Picture"
            className="rounded-full shadow-lg"
            width={130}
            height={130}
          />
        </div>
        <div className="text-left text-4xl font-semibold tracking-tight text-base-content sm:text-3xl">
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

      <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left text-sm text-base-content sm:max-w-xl sm:space-y-3 sm:text-xs">
        <p className="border-l-4 border-primary pl-4">
          I’m a full-stack developer, working mostly with{' '}
          <span className="font-semibold text-primary">Next.js</span> on frontend and{' '}
          <span className="font-semibold text-primary">Node.js/Python</span> on backend.
        </p>

        <p className="border-l-4 border-secondary pl-4">
          I do indie dev work and open to new projects or full-time roles if something exciting
          comes along. I’ve been experimenting with{' '}
          <span className="font-semibold text-secondary">LLMs</span> and recently built a digital
          assistant to explore different capabilities. I’m very interested in creating{' '}
          <span className="font-semibold">utility-focused projects</span>, given how amazing the
          foundational models currently are.
        </p>

        <p className="border-l-4 border-accent pl-4">
          There’s something incredibly satisfying about spending hours on a project and seeing it
          come to life. <span className="font-semibold text-accent">That’s what I love doing.</span>
        </p>
      </div>

      {/* Moved the buttons and social section below the content */}
      <div className="mt-4 flex flex-col items-end gap-2 border-base-content bg-base-200 pl-4 pt-2">
        {/* Talk to Ava Button */}
        <AvaChatButton />
        {/* Contact Me Button */}
        <button onClick={scrollToContact} className="btn btn-ghost btn-xs sm:btn-xs">
          Click here to send me a message
        </button>
        {/* Social Links */}
        <div className="flex gap-4 px-2">
          <a
            href="https://github.com/jasper-ang"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost btn-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jasper-z-ang/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost btn-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://drive.google.com/file/d/1lAti8fYPXEUms7ufTvU2ElVknDn19Atm/view?usp=sharing"
            target="_blank"
            download
            className="btn btn-circle btn-ghost btn-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
