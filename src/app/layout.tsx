import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "Jasper's Portfolio",
    template: "%s | Jasper's Portfolio",
  },
  description: 'Summary of work',
  openGraph: {
    title: "Jasper's Portfolio",
    description: 'Summary of work',
    url: 'https://yourdomain.com',
    siteName: "Jasper's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('bg-black text-white', inter.className)}>
      <body className="mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        <Header />
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
