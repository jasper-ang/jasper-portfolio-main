/**
 * Ava Chat Options Page
 *
 * This component displays the initial options for starting a chat with the digital Assistant.
 * It shows Ava's profile picture, an introduction, and three different chat options for the user to choose from.
 * Each option represents a different context for starting the conversation.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageCircle, User, Briefcase } from 'lucide-react';

// Type definition for chat options
type ChatOption = {
  id: string;
  icon: React.ReactNode;
  text: string;
};

// Chat options configuration
const chatOptions: ChatOption[] = [
  {
    id: 'work',
    icon: <Briefcase className="text-primary" />,
    text: "Hi, I'm hiring for a role and would like to learn more about Jasper's work experience.",
  },
  {
    id: 'friend',
    icon: <MessageCircle className="text-secondary" />,
    text: "Hi, I'm Jasper's friend and just wanted to catch up and see how he's doing.",
  },
  {
    id: 'connect',
    icon: <User className="text-accent" />,
    text: "Hi, I don't know Jasper personally, but I'm working on something and would love to connect with him.",
  },
];

const AvaChatPage: React.FC = () => {
  // Hooks
  const router = useRouter();

  // Business logic functions

  /**
   * Handles the selection of a chat option
   * @param {string} id - The id of the selected chat option
   */
  const handleOptionSelect = (id: string) => {
    router.push(`/avatar?option=${id}`);
  };

  // Render functions

  /**
   * Renders the header section with profile picture and introduction
   */
  const renderHeader = () => (
    <div className="flex items-center gap-8 sm:gap-4">
      <div className="h-20 w-20 overflow-hidden rounded-full shadow-lg">
        <Image
          src="/ava.jpg"
          alt="Ava Profile Picture"
          width={128}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-left text-xl font-bold tracking-tight text-base-content sm:text-xl">
        <span className="mb-2 block text-3xl text-primary">Hello.</span>
        <div className="inline-block overflow-hidden align-top">I’m Ava</div>
      </div>
    </div>
  );

  /**
   * Renders the introduction text
   */
  const renderIntroduction = () => (
    <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left text-sm text-base-content sm:max-w-xl sm:space-y-3 sm:text-xs">
      <p className="border-l-4 border-primary pl-4 font-semibold">
        I’m a digital personal assistant created by Jasper.
      </p>
      <p className="border-l-4 border-secondary pl-4">
        I would love to answer questions you have and get to know more about you.
      </p>
    </div>
  );

  /**
   * Renders the chat options
   */
  const renderChatOptions = () => (
    <div className="mt-8 space-y-4">
      {chatOptions.map(option => (
        <div
          key={option.id}
          className="flex cursor-pointer items-center gap-4 rounded-lg bg-base-200 p-6 transition-colors hover:bg-base-300 hover:font-semibold hover:shadow-glowPrimary"
          onClick={() => handleOptionSelect(option.id)}
        >
          <div className="btn btn-circle btn-ghost btn-sm">{option.icon}</div>
          <p className="text-sm text-base-content">{option.text}</p>
        </div>
      ))}
    </div>
  );

  // Main render
  return (
    <div className="min-h-fit bg-base-200 p-4">
      <section className="m-6 rounded-xl bg-base-100 p-8 shadow-xl">
        {renderHeader()}
        {renderIntroduction()}
        {renderChatOptions()}
      </section>
    </div>
  );
};

export default AvaChatPage;
