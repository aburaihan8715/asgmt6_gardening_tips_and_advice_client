import type { Metadata } from 'next';
import './globals.css';

import { Roboto } from 'next/font/google';
import Providers from '@/lib/Providers';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gardening Tips & Advice Platform',
  description: 'Your go-to platform for gardening knowledge and tips.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
