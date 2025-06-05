import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers';
import ThemeWrapper from '../components/ThemeWrapper';
import DarkModeToggle from '../components/DarkModeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Physics PYQs - Mathongo',
  description: 'Practice Physics Previous Year Questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className={inter.className} style={{ margin: 0, minHeight: '100vh' }}>
        <Providers>
          <ThemeWrapper>
            <DarkModeToggle />
            {children}
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
} 