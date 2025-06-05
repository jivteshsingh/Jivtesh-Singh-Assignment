'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, setSortDirection } from '../store/chaptersSlice';
import { RootState } from '../store';

const SortMenu = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.chapters.sortOption);
  const sortDirection = useSelector((state: RootState) => state.chapters.sortDirection);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (option: string) => {
    if (option === sortOption) {
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortOption(option));
      dispatch(setSortDirection('asc'));
    }
  };

  const getSortIcon = (option: string) => {
    if (option !== sortOption) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: isDarkMode ? '#2C3B52' : 'white',
          border: isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
          borderRadius: '24px',
          cursor: 'pointer',
          color: isDarkMode ? '#e5e7eb' : '#374151',
          fontSize: '14px',
          fontWeight: 400,
          transition: 'all 0.2s ease-in-out'
        }}
      >
        Sort
        <ChevronDown
          style={{
            width: '16px',
            height: '16px',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '4px',
          backgroundColor: isDarkMode ? '#2C3B52' : 'white',
          border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          minWidth: '200px'
        }}>
          <div
            onClick={() => handleSort('title')}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: sortOption === 'title' ? '#3b82f6' : isDarkMode ? '#e5e7eb' : '#374151',
              backgroundColor: sortOption === 'title' ? (isDarkMode ? '#374151' : '#eff6ff') : 'transparent',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px'
            }}
          >
            Chapter Name
            {getSortIcon('title')}
          </div>
          <div
            onClick={() => handleSort('questions')}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: sortOption === 'questions' ? '#3b82f6' : isDarkMode ? '#e5e7eb' : '#374151',
              backgroundColor: sortOption === 'questions' ? (isDarkMode ? '#374151' : '#eff6ff') : 'transparent'
            }}
          >
            Total Questions
            {getSortIcon('questions')}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu; 