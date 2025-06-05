import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Atom, Flask, MathOperations } from 'phosphor-react';
import { RootState } from '../store';
import { setSelectedSubject } from '../store/chaptersSlice';

const SubjectTabs = () => {
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state: RootState) => state.chapters.selectedSubject);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const subjects = [
    { name: 'Physics', icon: Atom, color: '#FF6B35' },
    { name: 'Chemistry', icon: Flask, color: '#22C55E' },
    { name: 'Mathematics', icon: MathOperations, color: '#3B82F6' }
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
      backgroundColor: isDarkMode ? '#222E3F' : 'white',
      padding: '8px 0'
    }}>
      {subjects.map((subject) => {
        const Icon = subject.icon;
        const isSelected = selectedSubject === subject.name;
        return (
          <div
            key={subject.name}
            onClick={() => dispatch(setSelectedSubject(subject.name))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              flex: 1,
              borderBottom: isSelected ? `2px solid ${subject.color}` : '2px solid transparent',
              paddingBottom: '8px'
            }}
          >
            <Icon size={20} weight="bold" color={isSelected ? subject.color : isDarkMode ? '#9ca3af' : '#6b7280'} />
            <span style={{
              fontSize: '14px',
              color: isSelected ? subject.color : isDarkMode ? '#9ca3af' : '#6b7280',
              fontWeight: isSelected ? '500' : '400'
            }}>
              {subject.name.substring(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectTabs;