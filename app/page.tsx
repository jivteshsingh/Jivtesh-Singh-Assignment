'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainLayout from '../components/MainLayout';
import { Providers } from '../components/Providers';
import ChaptersInitializer from '../components/ChaptersInitializer';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [breakpoint]);
  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow: hidden;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Providers>
        <div style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex'
        }}>
          <ChaptersInitializer />
          {!isMobile && <Sidebar />}
          <MainLayout />
        </div>
      </Providers>
    </>
  );
}