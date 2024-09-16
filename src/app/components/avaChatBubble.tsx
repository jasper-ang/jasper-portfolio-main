import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AvaChatBubble() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    router.push('/avatar/options');
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-12 right-14 flex cursor-pointer items-end space-x-2 transition-all duration-300 ease-in-out"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`chat chat-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-md chat-bubble max-w-xs rounded-2xl bg-neutral px-4 py-2 text-base-content shadow-md">
          Hello, I’m Ava, Jasper’s digital assistant. How can I help?
        </div>
      </div>
      <div className="avatar transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="h-14 w-14 overflow-hidden rounded-full shadow-lg ring-2 ring-base-100">
          <Image
            src="/ava.jpg"
            alt="Ava Profile Picture"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
