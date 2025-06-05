'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { RootState } from '../store';
import {
  toggleClassFilter,
  toggleUnitFilter,
  toggleStatusFilter,
  toggleWeakChapters
} from '../store/chaptersSlice';

// Mobile detection hook
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

const Filters = () => {
  const dispatch = useDispatch();
  const classFilters = useSelector((state: RootState) => state.chapters.classFilters);
  const unitFilters = useSelector((state: RootState) => state.chapters.unitFilters);
  const showWeakChaptersOnly = useSelector((state: RootState) => state.chapters.showWeakChaptersOnly);
  const statusFilters = useSelector((state: RootState) => state.chapters.statusFilters);
  const chapters = useSelector((state: RootState) => state.chapters.chapters);
  const selectedSubject = useSelector((state: RootState) => state.chapters.selectedSubject);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [openDropdown, setOpenDropdown] = useState<null | 'class' | 'unit'>(null);

  const classDropdownRef = useRef<HTMLDivElement>(null);
  const unitDropdownRef = useRef<HTMLDivElement>(null);
  const classButtonRef = useRef<HTMLDivElement>(null);
  const unitButtonRef = useRef<HTMLDivElement>(null);

  const classes = Array.from(new Set(
    chapters
      .filter(chapter => chapter.subject === selectedSubject)
      .map(chapter => chapter.class)
  )).sort();

  const units = Array.from(new Set(
    chapters
      .filter(chapter => chapter.subject === selectedSubject)
      .map(chapter => chapter.unit)
  )).sort();

  const areAllClassesSelected = classFilters.length === classes.length;
  const areAllUnitsSelected = unitFilters.length === units.length;
  const isNotStartedSelected = statusFilters.includes("Not Started");

  // Close dropdowns when subject changes (tab change)
  useEffect(() => {
    setOpenDropdown(null);
  }, [selectedSubject]);

  const handleDropdownItemClick = (e: React.MouseEvent, onToggle: (item: string) => void, item: string) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(item);
  };

  const renderDropdown = (
    items: string[],
    selectedItems: string[],
    onToggle: (item: string) => void,
    show: boolean,
    ref: React.RefObject<HTMLDivElement | null>,
    isMobile: boolean = false,
    onClose?: () => void,
    borderRadius: number = 8
  ) => {
    if (!show) return null;
    if (isMobile) {
      // Full-width overlay for mobile
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'transparent',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          <div
            style={{
              marginTop: 80,
              background: '#EFF6FF',
              minWidth: 220,
              maxWidth: 320,
              width: '90vw',
              padding: '8px 0',
              border: 'none',
              borderRadius: 16,
              boxShadow: 'none',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            {items.map(item => (
              <label
                key={item}
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  color: selectedItems.includes(item) ? '#3B82F6' : '#374151',
                  backgroundColor: selectedItems.includes(item) ? '#EFF6FF' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                  userSelect: 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => onToggle(item)}
                  style={{ accentColor: '#3B82F6' }}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      );
    }
    // Desktop dropdown
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: 4,
          backgroundColor: isDarkMode ? '#2C3B52' : 'white',
          border: isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
          borderRadius: borderRadius,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          minWidth: 150,
          overflow: 'hidden',
        }}
      >
        {items.map(item => (
          <label
            key={item}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              color: selectedItems.includes(item) ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
              backgroundColor: selectedItems.includes(item) ? (isDarkMode ? '#374151' : '#EFF6FF') : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => onToggle(item)}
              style={{ accentColor: '#3B82F6' }}
            />
            {item}
          </label>
        ))}
      </div>
    );
  };

  const isMobile = useIsMobile();

  // Chevron/fade logic for mobile scroll
  const [showChevron, setShowChevron] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowChevron(el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 16);
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile]);

  const openDropdownRef = useRef<null | 'class' | 'unit'>(null);
  useEffect(() => {
    openDropdownRef.current = openDropdown;
  }, [openDropdown]);

  // Attach document event listener once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function handleClick(e: MouseEvent) {
      if (!openDropdownRef.current) return;
      const target = e.target as Node;
      if (
        (classButtonRef.current && classButtonRef.current.contains(target)) ||
        (classDropdownRef.current && classDropdownRef.current.contains(target)) ||
        (unitButtonRef.current && unitButtonRef.current.contains(target)) ||
        (unitDropdownRef.current && unitDropdownRef.current.contains(target))
      ) {
        return;
      }
      setOpenDropdown(null);
    }
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, []);

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            position: 'relative',
          }}
          ref={scrollRef}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              paddingLeft: '1rem',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Class Filter */}
            <div style={{ position: 'relative' }} ref={classDropdownRef}>
              <div
                ref={classButtonRef}
                onMouseDown={e => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown !== 'class' ? 'class' : null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: isDarkMode ? '#2C3B52' : 'white',
                  border: !areAllClassesSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
                  borderRadius: 24,
                  cursor: 'pointer',
                  width: 'fit-content',
                  whiteSpace: 'nowrap',
                  color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151'
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
                  marginRight: 8
                }}>
                  {!areAllClassesSelected ? `${classFilters.length} Classes` : 'All Classes'}
                </span>
                <ChevronDown style={{
                  width: 16,
                  height: 16,
                  color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#6b7280',
                  transform: openDropdown === 'class' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s'
                }} />
              </div>
              {renderDropdown(classes, classFilters, (cls) => dispatch(toggleClassFilter(cls)), openDropdown === 'class', classDropdownRef, true, () => setOpenDropdown(null))}
            </div>

            {/* Units Filter */}
            <div style={{ position: 'relative' }} ref={unitDropdownRef}>
              <div
                ref={unitButtonRef}
                onMouseDown={e => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown !== 'unit' ? 'unit' : null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: isDarkMode ? '#2C3B52' : 'white',
                  border: !areAllUnitsSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
                  borderRadius: 24,
                  cursor: 'pointer',
                  width: 'fit-content',
                  whiteSpace: 'nowrap',
                  color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151'
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
                  marginRight: 8
                }}>
                  {!areAllUnitsSelected ? `${unitFilters.length} Units` : 'All Units'}
                </span>
                <ChevronDown style={{
                  width: 16,
                  height: 16,
                  color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#6b7280',
                  transform: openDropdown === 'unit' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s'
                }} />
              </div>
              {renderDropdown(units, unitFilters, (unit) => dispatch(toggleUnitFilter(unit)), openDropdown === 'unit', unitDropdownRef, true, () => setOpenDropdown(null))}
            </div>

            {/* Status Filter */}
            <button
              onClick={() => dispatch(toggleStatusFilter("Not Started"))}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: isDarkMode ? '#2C3B52' : 'white',
                border: isNotStartedSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
                borderRadius: 24,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: isNotStartedSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
                width: 'fit-content',
                whiteSpace: 'nowrap',
              }}
            >
              Not Started
            </button>

            {/* Weak Chapters Filter */}
            <button
              onClick={() => dispatch(toggleWeakChapters())}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: isDarkMode ? '#2C3B52' : 'white',
                border: showWeakChaptersOnly ? '2px solid #f97316' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
                borderRadius: 24,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: showWeakChaptersOnly ? '#f97316' : isDarkMode ? '#e5e7eb' : '#374151',
                width: 'fit-content',
                whiteSpace: 'nowrap',
                marginRight: 40,
              }}
            >
              Weak Chapters
            </button>
          </div>
          <style>{`
            div[style*='overflow-x: auto']::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
        {/* Chevron/fade overlay */}
        {showChevron && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 48,
                height: '100%',
                background: isDarkMode 
                  ? 'linear-gradient(to left, #222E3F 60%, rgba(34,46,63,0))' 
                  : 'linear-gradient(to left, white 60%, rgba(255,255,255,0))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', width: 28, height: 28 }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: '0 1rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Class Filter */}
      <div style={{ position: 'relative' }} ref={classDropdownRef}>
        <div
          ref={classButtonRef}
          onMouseDown={e => {
            e.stopPropagation();
            setOpenDropdown(openDropdown !== 'class' ? 'class' : null);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: isDarkMode ? '#2C3B52' : 'white',
            border: !areAllClassesSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
            borderRadius: 24,
            cursor: 'pointer',
            width: 'fit-content',
            whiteSpace: 'nowrap',
            color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151'
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
            marginRight: 8
          }}>
            {!areAllClassesSelected ? `${classFilters.length} Classes` : 'All Classes'}
          </span>
          <ChevronDown style={{
            width: 16,
            height: 16,
            color: !areAllClassesSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#6b7280',
            transform: openDropdown === 'class' ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }} />
        </div>
        {renderDropdown(
          classes,
          classFilters,
          (cls) => dispatch(toggleClassFilter(cls)),
          openDropdown === 'class',
          classDropdownRef,
          false,
          undefined,
          16
        )}
      </div>

      {/* Units Filter */}
      <div style={{ position: 'relative' }} ref={unitDropdownRef}>
        <div
          ref={unitButtonRef}
          onMouseDown={e => {
            e.stopPropagation();
            setOpenDropdown(openDropdown !== 'unit' ? 'unit' : null);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: isDarkMode ? '#2C3B52' : 'white',
            border: !areAllUnitsSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
            borderRadius: 24,
            cursor: 'pointer',
            width: 'fit-content',
            whiteSpace: 'nowrap',
            color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151'
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
            marginRight: 8
          }}>
            {!areAllUnitsSelected ? `${unitFilters.length} Units` : 'All Units'}
          </span>
          <ChevronDown style={{
            width: 16,
            height: 16,
            color: !areAllUnitsSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#6b7280',
            transform: openDropdown === 'unit' ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }} />
        </div>
        {renderDropdown(units, unitFilters, (unit) => dispatch(toggleUnitFilter(unit)), openDropdown === 'unit', unitDropdownRef, false, undefined, 16)}
      </div>

      {/* Status Filter */}
      <button
        onClick={() => dispatch(toggleStatusFilter("Not Started"))}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: isDarkMode ? '#2C3B52' : 'white',
          border: isNotStartedSelected ? '2px solid #3B82F6' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
          borderRadius: 24,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          color: isNotStartedSelected ? '#3B82F6' : isDarkMode ? '#e5e7eb' : '#374151',
          width: 'fit-content',
          whiteSpace: 'nowrap',
        }}
      >
        Not Started
      </button>

      {/* Weak Chapters Filter */}
      <button
        onClick={() => dispatch(toggleWeakChapters())}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: isDarkMode ? '#2C3B52' : 'white',
          border: showWeakChaptersOnly ? '2px solid #f97316' : isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
          borderRadius: 24,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          color: showWeakChaptersOnly ? '#f97316' : isDarkMode ? '#e5e7eb' : '#374151',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          marginRight: 40,
        }}
      >
        Weak Chapters
      </button>
    </div>
  );
};

export default Filters;