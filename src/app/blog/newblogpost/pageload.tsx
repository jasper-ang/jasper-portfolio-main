'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage({ searchParams }: { searchParams: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    if (searchParams.id) {
      // Redirect to the actual blog page using the id or slug
      router.replace(`/blog/${searchParams.id}`);
    }
  }, [searchParams.id, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] text-[#e5e7eb]">
      <p className="text-lg">Redirecting to your new blog post...</p>
    </div>
  );
}
