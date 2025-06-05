'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '../store';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    // Apply background color to the entire document body
    document.body.style.backgroundColor = isDarkMode ? '#222E3F' : '#FFFFFF';
    document.body.style.color = isDarkMode ? '#FFFFFF' : '#000000';
  }, [isDarkMode]);

  return (
    <div style={{
      minHeight: '100vh',
      transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
    }}>
      {children}
    </div>
  );
} 