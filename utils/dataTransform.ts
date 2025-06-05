import { ComponentType } from 'react';
import { Zap, TrendingUp, Circle, ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react';
import { ChapterData, ChapterCardProps } from '../types/chapter';

const getDefaultIcon = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [Zap, TrendingUp, Circle, ArrowLeft, ArrowRight];
  return icons[index % icons.length];
};

export const transformChapterData = (
  data: ChapterData[],
  sortOption?: 'title' | 'questions' | string | '',
  sortDirection: 'asc' | 'desc' = 'asc'
): ChapterCardProps[] => {
  // First transform the data
  let transformed = data.map((chapter, index) => {
    // Calculate trend based on 2024 and 2025 questions
    const trend: 'up' | 'down' | 'neutral' = chapter.yearWiseQuestionCount['2025'] > chapter.yearWiseQuestionCount['2024'] 
      ? 'up' 
      : chapter.yearWiseQuestionCount['2025'] < chapter.yearWiseQuestionCount['2024']
        ? 'down'
        : 'neutral';

    // Calculate total questions across all years
    const totalQuestionsAllYears = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);

    return {
      icon: getDefaultIcon(index),
      title: chapter.chapter,
      year2025: `${chapter.yearWiseQuestionCount['2025']}Qs`,
      year2024: `${chapter.yearWiseQuestionCount['2024']}Qs`,
      totalQuestions: `${chapter.questionSolved}/${totalQuestionsAllYears} Qs`,
      trend
    };
  });

  // Then apply sorting if needed
  if (sortOption) {
    transformed.sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'questions': {
          const aTotal = parseInt(a.totalQuestions.split('/')[1]) || 0;
          const bTotal = parseInt(b.totalQuestions.split('/')[1]) || 0;
          comparison = aTotal - bTotal;
          break;
        }
        case 'year2025': {
          const aCount = parseInt(a.year2025.replace('Qs', '')) || 0;
          const bCount = parseInt(b.year2025.replace('Qs', '')) || 0;
          comparison = aCount - bCount;
          break;
        }
        case 'year2024': {
          const aCount = parseInt(a.year2024.replace('Qs', '')) || 0;
          const bCount = parseInt(b.year2024.replace('Qs', '')) || 0;
          comparison = aCount - bCount;
          break;
        }
        default:
          return 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  return transformed;
}; 