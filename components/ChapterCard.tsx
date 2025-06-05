import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ChapterCardProps {
  icon: any;
  title: string;
  year2025: string;
  year2024: string;
  totalQuestions: string;
  trend: 'up' | 'down' | 'neutral';
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  icon: Icon,
  title,
  year2025,
  year2024,
  totalQuestions,
  trend,
}) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div style={{
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: isDarkMode ? '#2C3B52' : 'white',
      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out'
    }}>
      <div style={{ marginTop: 2 }}>
        {Icon && <Icon size={20} color={isDarkMode ? '#f97316' : '#f97316'} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontWeight: 500, 
          fontSize: 15, 
          color: isDarkMode ? 'white' : '#111827', 
          marginBottom: 2 
        }}>
          {title}
        </div>
        <div style={{ 
          fontSize: 13, 
          color: isDarkMode ? '#9CA3AF' : '#6b7280', 
          display: 'flex', 
          gap: 8 
        }}>
          <span>2025: {year2025}</span>
          {trend === 'up' && <ArrowUp size={12} color="#10b981" />}
          {trend === 'down' && <ArrowDown size={12} color="#ef4444" />}
          <span>|</span>
          <span>2024: {year2024}</span>
        </div>
      </div>
      <div style={{ 
        fontSize: 13, 
        color: isDarkMode ? '#9CA3AF' : '#6b7280', 
        minWidth: 50, 
        textAlign: 'right' 
      }}>
        {totalQuestions}
      </div>
    </div>
  );
};

export default ChapterCard; 