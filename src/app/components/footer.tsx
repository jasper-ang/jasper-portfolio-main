function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const links = [
    { href: 'https://www.linkedin.com/in/jasper-z-ang/', label: 'linkedin' },
    { href: 'https://github.com/jasper-ang', label: 'github' },
    { href: 'https://github.com/jasper-ang/jasper-portfolio-main', label: 'view source' },
  ];

  return (
    <footer className="mb-16 flex flex-col items-center">
      <ul className="mt-8 flex flex-col items-center space-x-0 space-y-2 text-base-content md:flex-row md:space-x-4 md:space-y-0">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="flex items-center justify-center transition-colors duration-300 hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <ArrowIcon />
              <p className="ml-2 h-7">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-base-content">© {new Date().getFullYear()} MIT Licensed</p>
    </footer>
  );
}
