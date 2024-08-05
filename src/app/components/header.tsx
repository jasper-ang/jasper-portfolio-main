// components/Header.tsx
const Header = () => {
  return (
    <nav className="bg-[#2d333b] p-4">
      <ul className="flex justify-center space-x-4">
        {['Home', 'About', 'Projects', 'Contact', 'LinkedIn', 'GitHub'].map(item => (
          <li key={item} className="hover:underline">
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
