'use client';

import { Moon, Sun } from 'lucide-react';
import { toggleDarkMode } from '../store/themeSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { CSSProperties } from 'react';

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const getButtonStyles = (): CSSProperties => ({
    position: 'fixed',
    top: '10px',
    right: '16px',
    width: '64px',
    height: '32px',
    padding: '4px',
    border: 'none',
    borderRadius: '16px',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cursor: 'pointer',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isDarkMode ? 'flex-start' : 'flex-end',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDarkMode 
      ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
      : '0 4px 15px rgba(245, 87, 108, 0.4)',
  });

  const iconContainerStyles: CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  };

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      style={getButtonStyles()}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement;
        Object.assign(target.style, {
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode 
            ? '0 6px 20px rgba(102, 126, 234, 0.6)' 
            : '0 6px 20px rgba(245, 87, 108, 0.6)'
        });
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        Object.assign(target.style, getButtonStyles());
      }}
      aria-label="Toggle dark mode"
    >
      <div style={iconContainerStyles}>
        {isDarkMode ? (
          <Sun 
            size={14} 
            style={{ 
              color: '#f59e0b',
              filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.6))'
            }} 
          />
        ) : (
          <Moon 
            size={14} 
            style={{ 
              color: '#6366f1',
              filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.6))'
            }} 
          />
        )}
      </div>
    </button>
  );
}