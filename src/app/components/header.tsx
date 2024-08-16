const Header = () => {
  return (
    <nav className="bg-[#1a1a1a] p-4">
      <ul className="flex justify-center space-x-4 text-[#e5e7eb]">
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
