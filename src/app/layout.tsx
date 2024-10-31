'use client';

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './contexts/authentication';
import AvaChatBubble from './components/avaChatBubble';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SessionProvider } from './contexts/sessions';
import { pingBE } from './api/pingBE';
import React, { useEffect } from 'react';

// Load Rubik as a variable font
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

  useEffect(() => {
    pingBE();
  }, []);

  return (
    <html lang="en" className={cx(rubik.className, 'bg-black text-white')}>
      <body className="mx-auto mt-4 max-w-xl antialiased sm:mt-0">
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <AuthProvider>
          <SessionProvider>
            <Header />
            <main className="mt flex min-w-0 flex-auto flex-col">{children}</main>
            <Footer />
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
