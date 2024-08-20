import Link from 'next/link';
import { Blog } from '../api/blogfetch';

interface BlogListProps {
  posts: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <section className="bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold">My Blog</h2>
      <ul className="bg-base-100 text-base-content space-y-4 rounded py-12">
        {posts.map(post => (
          <li key={post._id} className="link-hover border-[#30363d] py-1">
            <Link href={`/blog/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
