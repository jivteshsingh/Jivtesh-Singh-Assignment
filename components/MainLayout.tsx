import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Atom, Flask, MathOperations } from 'phosphor-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredChapters,
  setSelectedSubject
} from '../store/chaptersSlice';
import { transformChapterData } from '../utils/dataTransform';
import { RootState } from '../store';
import ChapterCard from './ChapterCard';
import Filters from './Filters';
import SubjectTabs from './SubjectTabs';
import SortMenu from './SortMenu';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && typeof window.innerWidth === 'number') {
        setIsMobile(window.innerWidth < breakpoint);
      } else {
        setIsMobile(false);
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

const MainLayout = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  const dispatch = useDispatch();
  const filteredChapters = useSelector(selectFilteredChapters);
  const selectedSubject = useSelector((state: RootState) => state.chapters.selectedSubject);
  const sortOption = useSelector((state: RootState) => state.chapters.sortOption);
  const sortDirection = useSelector((state: RootState) => state.chapters.sortDirection);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => { setHasMounted(true); }, []);

  const chapters = transformChapterData(filteredChapters, sortOption, sortDirection);

  if (!hasMounted || isMobile === null) return null;

  if (isMobile) {
    return (
      <div style={{ 
        height: '100vh',
        width: '100%',
        backgroundColor: isDarkMode ? '#222E3F' : 'white',
        color: isDarkMode ? 'white' : 'inherit',
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden' // Prevent body scroll
      }}>
        {/* Fixed Header */}
        <header style={{
          backgroundColor: isDarkMode ? '#222E3F' : 'white',
          padding: '12px 16px',
          borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}>
          <ArrowLeft size={24} style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }} />
          <span style={{ fontSize: '18px', fontWeight: 600, color: isDarkMode ? 'white' : '#111827' }}>JEE Main</span>
        </header>
        
        {/* Fixed Subject Tabs */}
        <div style={{ flexShrink: 0 }}>
          <SubjectTabs />
        </div>

        {/* Fixed Filters */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#222E3F' : 'white', 
          padding: '8px 0', 
          marginRight: 16,
          flexShrink: 0
        }}>
          <Filters />
        </div>

        {/* Fixed Sort Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '8px 16px', 
          backgroundColor: isDarkMode ? '#222E3F' : 'white',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 14, color: isDarkMode ? '#e5e7eb' : '#374151' }}>Showing all chapters ({chapters.length})</span>
          <SortMenu />
        </div>
        
        {/* Scrollable Chapter List */}
        <div style={{ 
          flex: 1,
          overflow: 'hidden', // Hide scrollbar but allow scroll
          background: isDarkMode ? '#222E3F' : 'white'
        }}>
          <div style={{
            height: '100%',
            overflowY: 'scroll',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            WebkitOverflowScrolling: 'touch' // iOS smooth scrolling
          }}>
            <style>{`
              /* Hide scrollbar for Chrome, Safari and Opera */
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {chapters.map((chapter, idx) => (
              <div key={idx} style={{ 
                padding: '16px 16px', 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 12
              }}>
                <div style={{ marginTop: 2 }}>{chapter.icon && React.createElement(chapter.icon, { size: 20, color: '#f97316' })}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 15, color: isDarkMode ? 'white' : '#111827', marginBottom: 2 }}>{chapter.title}</div>
                  <div style={{ fontSize: 13, color: isDarkMode ? '#9ca3af' : '#6b7280', display: 'flex', gap: 8 }}>
                    <span>2025: {chapter.year2025}</span>
                    {chapter.trend === 'up' && <ArrowUp size={12} color="#10b981" />}
                    {chapter.trend === 'down' && <ArrowDown size={12} color="#ef4444" />}
                    <span>|</span>
                    <span>2024: {chapter.year2024}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: isDarkMode ? '#9ca3af' : '#6b7280', minWidth: 50, textAlign: 'right' }}>{chapter.totalQuestions} Qs</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100vh',
      width: '60%', 
      marginRight: '15%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: isDarkMode ? '#222E3F' : 'white',
      color: isDarkMode ? 'white' : 'inherit',
      transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
      overflow: 'hidden'
    }}>
      {/* Fixed Header */}
      <header style={{ 
        padding: '2rem 0', 
        flexShrink: 0,
        backgroundColor: 'transparent'
      }}>
        <div style={{ width: '80%', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: selectedSubject === 'Physics' ? '#FF6B35' : selectedSubject === 'Chemistry' ? '#22C55E' : '#3B82F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedSubject === 'Physics' && <Atom size={24} weight="bold" style={{ color: 'white' }} />}
              {selectedSubject === 'Chemistry' && <Flask size={24} weight="bold" style={{ color: 'white' }} />}
              {selectedSubject === 'Mathematics' && <MathOperations size={24} weight="bold" style={{ color: 'white' }} />}
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: isDarkMode ? 'white' : '#111827', 
              margin: 0, 
              fontFamily: 'Inter, sans-serif' 
            }}>{selectedSubject} PYQs</h1>
          </div>
          <p style={{ 
            fontSize: '16px', 
            color: isDarkMode ? '#e5e7eb' : '#6b7280', 
            margin: 0, 
            fontFamily: 'Inter, sans-serif' 
          }}>Chapter-wise Collection of {selectedSubject} PYQs</p>
        </div>
      </header>
      
      {/* Fixed Filters */}
      <div style={{ 
        paddingTop: '16px', 
        paddingBottom: '16px', 
        flexShrink: 0, 
        overflowX: 'visible', 
        WebkitOverflowScrolling: 'touch',
        backgroundColor: 'transparent'
      }}>
        <Filters />
      </div>

      {/* Fixed Sort Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 1rem', 
        backgroundColor: 'transparent',
        flexShrink: 0
      }}>
        <span style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontSize: '16px', 
          fontWeight: '400', 
          color: isDarkMode ? '#e5e7eb' : '#374151'
        }}>
          Showing all chapters ({chapters.length})
        </span>
        <SortMenu />
      </div>

      {/* Scrollable Chapter List */}
      <div style={{ 
        flex: 1,
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '0px 1rem', // Equal top and bottom padding for consistent spacing
          height: '100%',
          overflowY: 'scroll',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          backgroundColor: 'transparent',
          WebkitOverflowScrolling: 'touch'
        }}>
          <style>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {chapters.map((chapter, index) => (
            <div key={index} style={{ marginBottom: '12px' }}> {/* Consistent margin for all items */}
              <ChapterCard
                icon={chapter.icon}
                title={chapter.title}
                year2025={chapter.year2025}
                year2024={chapter.year2024}
                totalQuestions={chapter.totalQuestions}
                trend={chapter.trend}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;