import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-[#1a1a1a] p-4">
      <ul className="flex justify-center space-x-4 text-[#e5e7eb]">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
