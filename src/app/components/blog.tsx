import Link from 'next/link';

// Define a type for the Blog object
export interface Blog {
  _id?: string;
  title: string;
  content: string;
}

// Define the props for the BlogComponent
interface BlogComponentProps {
  posts: Blog[];
}

// Define the BlogComponent as a Functional Component
const BlogComponent: React.FC<BlogComponentProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <Link href={`/blog/${post._id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogComponent;
