'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useAuth } from '../contexts/authentication';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const navigation = useRouter();
  const { user, setUser } = useAuth(); // Access the user data from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleLogout = () => {
    // Clear the cookie
    nookies.destroy(null, 'token');

    // Reset the user in the context
    setUser(null);

    // Redirect to the home page or login page
    navigation.push('/');
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false); // Close the dropdown if the click is outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          Jasper
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {user ? ( // Check if the user is logged in
              <div>Welcome, {user.user}</div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <details
              ref={dropdownRef}
              className="dropdown"
              open={dropdownOpen}
              onClick={e => {
                e.preventDefault(); // Prevent default action of <details> tag
                setDropdownOpen(!dropdownOpen); // Toggle dropdown state
              }}
            >
              <summary className="cursor-pointer">More</summary>
              <ul className="dropdown-menu absolute z-50 rounded-md bg-base-200 p-2 shadow-lg">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
