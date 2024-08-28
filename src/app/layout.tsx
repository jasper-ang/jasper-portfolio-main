'use client';

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './contexts/authentication';

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('bg-black text-white')}>
      <body className="mt-8 max-w-xl antialiased lg:mx-auto">
        <AuthProvider>
          <Header />
          <main className="mt-4 flex min-w-0 flex-auto flex-col px-2 md:px-0">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
