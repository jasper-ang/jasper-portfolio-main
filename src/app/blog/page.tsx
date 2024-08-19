import Link from 'next/link';
import BlogList from '../components/bloglist';
import { fetchBlogPosts } from '../api/blogfetch';

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <main className="flex-auto bg-[#1a1a1a] p-4 text-[#e5e7eb]">
      {/* Header with New Blog Post button */}
      <div className="mb-4 flex-auto items-center justify-between">
        <Link href="/blog/newblogpost">
          <button className="float-right mb-4 rounded bg-[#6d44c1] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#6d44c1]">
            New Blog Post
          </button>
        </Link>
      </div>

      {/* Blog list rendering */}
      <BlogList posts={posts} />
    </main>
  );
}
