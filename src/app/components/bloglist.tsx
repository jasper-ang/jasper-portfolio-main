import Link from 'next/link';
import { Blog } from '../api/blogfetch';

interface BlogListProps {
  posts: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <section className="bg-[#1a1a1a] text-[#e5e7eb]">
      <h2 className="text-3xl font-bold">My Blog</h2>
      <ul className="space-y-4 rounded bg-[#1a1a1a] py-12 text-[#e5e7eb]">
        {posts.map(post => (
          <li key={post._id} className="border-[#30363d] py-1">
            <Link href={`/blog/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
