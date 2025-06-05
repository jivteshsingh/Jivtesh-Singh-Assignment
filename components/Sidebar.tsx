'use client';

import React, { useState } from 'react';
import { Atom, Flask, MathOperations } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubject } from '../store/chaptersSlice';
import { RootState } from '../store';

const Sidebar = () => {
  const [selectedSubject, setLocalSubject] = useState('Physics');
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleSubjectClick = (subjectName: string) => {
    setLocalSubject(subjectName);
    dispatch(setSelectedSubject(subjectName));
  };

  const subjects = [
    {
      name: 'Physics',
      icon: <Atom size={12} color="white" weight="bold" />,
      color: '#FF6B35'
    },
    {
      name: 'Chemistry',
      icon: <Flask size={12} color="white" weight="bold" />,
      color: '#22C55E'
    },
    {
      name: 'Mathematics',
      icon: <MathOperations size={12} color="white" weight="bold" />,
      color: '#3B82F6'
    }
  ];

  return (
    <div 
      style={{
        width: '25%',
        backgroundColor: isDarkMode ? '#222E3F' : 'white',
        borderRight: 'none',
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        overflow: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
      }}
      className="hide-scrollbar"
    >
      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingTop: '24px',
        paddingBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* Logo */}
          <img 
            src="/logo.png" 
            alt="JEE Main Logo" 
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          
          {/* Title */}
          <h1 style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '28px',
            color: isDarkMode ? 'white' : '#111827',
            margin: 0
          }}>
            JEE Main
          </h1>
        </div>
        
        {/* Stats */}
        <p style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: isDarkMode ? '#9CA3AF' : '#6B7280',
          margin: 0,
          textAlign: 'center'
        }}>
          2025 - 2009 | 173 Papers | 15825 Qs
        </p>
      </div>

      {/* Subject Sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px 10%'
      }}>
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => handleSubjectClick(subject.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: selectedSubject === subject.name 
                ? '#1D2933' 
                : isDarkMode ? '#222E3F' : 'white',
              borderRadius: '12px',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: subject.color,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {subject.icon}
            </div>
            
            <span style={{
              fontFamily: 'Inter',
              color: selectedSubject === subject.name 
                ? 'white' 
                : isDarkMode ? '#e5e7eb' : '#1D2933',
              fontSize: '16px',
              fontWeight: 500,
              flex: 1
            }}>
              {subject.name} PYQs
            </span>
            
            <div style={{ 
              color: selectedSubject === subject.name 
                ? 'white' 
                : isDarkMode ? '#e5e7eb' : '#1D2933',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              ❯
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;