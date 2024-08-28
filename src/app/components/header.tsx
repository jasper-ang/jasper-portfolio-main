'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useAuth } from '../contexts/authentication';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const navigation = useRouter();
  const { user, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Update the ref to HTMLDivElement

  const handleLogout = () => {
    nookies.destroy(null, 'token');
    setUser(null);
    navigation.push('/');
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
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
          Home
        </Link>
      </div>
      <div className="flex flex-none items-center">
        <ul className="menu menu-horizontal px-1">
          <li>{user ? <div>Welcome, {user.user}</div> : <Link href="/login">Login</Link>}</li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end relative" ref={dropdownRef}>
          <label
            tabIndex={0}
            className="btn btn-ghost"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </label>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content absolute right-0 z-50 mt-3 w-auto rounded-box border border-primary bg-base-200 p-2 shadow"
            >
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {user && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
