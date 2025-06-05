import { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

export interface YearWiseQuestionCount {
  "2019": number;
  "2020": number;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
  "2025": number;
}

export interface ChapterData {
  id: string;
  title: string;
  subject: string;
  class: string;
  unit: string;
  status: "Not Started" | "In Progress" | "Completed";
  isWeakChapter: boolean;
  yearWiseQuestionCount: YearWiseQuestionCount;
  questionSolved: number;
  chapter: string;
}

export interface ChapterCardProps {
  icon: LucideIcon;
  title: string;
  year2025: string;
  year2024: string;
  totalQuestions: string;
  trend: 'up' | 'down' | 'neutral';
} 