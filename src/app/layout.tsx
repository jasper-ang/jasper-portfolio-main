'use client';

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './contexts/authentication';

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('bg-black text-white')}>
      <body className="mx-auto mt-4 max-w-xl antialiased">
        <AuthProvider>
          <Header />
          <main className="mt-2 flex min-w-0 flex-auto flex-col px-0 sm:px-2">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
