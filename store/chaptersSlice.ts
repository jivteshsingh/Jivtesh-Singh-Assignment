import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChapterData } from '../types/chapter';

type SortOption = 'title' | 'questions' | 'year2025' | 'year2024' | '';
type SortDirection = 'asc' | 'desc';

interface ChaptersState {
  chapters: ChapterData[];
  classFilters: string[];
  unitFilters: string[];
  showWeakChaptersOnly: boolean;
  selectedSubject: string;
  statusFilters: ("Not Started" | "In Progress" | "Completed")[];
  // Track available options
  availableClasses: string[];
  availableUnits: string[];
  sortOption: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: ChaptersState = {
  chapters: [],
  classFilters: [], // Will be populated when chapters are set
  unitFilters: [], // Will be populated when chapters are set
  showWeakChaptersOnly: false,
  selectedSubject: 'Physics',
  statusFilters: [],  // Initially empty
  availableClasses: [],
  availableUnits: [],
  sortOption: 'title',
  sortDirection: 'asc'
};

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChapters(state, action: PayloadAction<ChapterData[]>) {
      state.chapters = action.payload;
      // Initialize available options and filters
      const subjectChapters = action.payload.filter(chapter => chapter.subject === state.selectedSubject);
      state.availableClasses = Array.from(new Set(subjectChapters.map(chapter => chapter.class))).sort();
      state.availableUnits = Array.from(new Set(subjectChapters.map(chapter => chapter.unit))).sort();
      // Set all filters to include all available options
      state.classFilters = [...state.availableClasses];
      state.unitFilters = [...state.availableUnits];
    },
    toggleClassFilter(state, action: PayloadAction<string>) {
      const index = state.classFilters.indexOf(action.payload);
      if (index === -1) {
        state.classFilters.push(action.payload);
      } else {
        state.classFilters.splice(index, 1);
        // If all are deselected, select all
        if (state.classFilters.length === 0) {
          state.classFilters = [...state.availableClasses];
        }
      }
    },
    toggleUnitFilter(state, action: PayloadAction<string>) {
      const index = state.unitFilters.indexOf(action.payload);
      if (index === -1) {
        state.unitFilters.push(action.payload);
      } else {
        state.unitFilters.splice(index, 1);
        // If all are deselected, select all
        if (state.unitFilters.length === 0) {
          state.unitFilters = [...state.availableUnits];
        }
      }
    },
    toggleWeakChapters(state) {
      state.showWeakChaptersOnly = !state.showWeakChaptersOnly;
    },
    toggleStatusFilter(state, action: PayloadAction<"Not Started" | "In Progress" | "Completed">) {
      const index = state.statusFilters.indexOf(action.payload);
      if (index === -1) {
        state.statusFilters.push(action.payload);
      } else {
        state.statusFilters.splice(index, 1);
      }
    },
    setSelectedSubject(state, action: PayloadAction<string>) {
      state.selectedSubject = action.payload;
      const subjectChapters = state.chapters.filter(chapter => chapter.subject === action.payload);
      state.availableClasses = Array.from(new Set(subjectChapters.map(chapter => chapter.class))).sort();
      state.availableUnits = Array.from(new Set(subjectChapters.map(chapter => chapter.unit))).sort();
      state.classFilters = [...state.availableClasses];
      state.unitFilters = [...state.availableUnits];
      state.statusFilters = []; // Reset to empty when changing subject
    },
    clearAllFilters(state) {
      state.classFilters = [...state.availableClasses];
      state.unitFilters = [...state.availableUnits];
      state.statusFilters = []; // Reset to empty
      state.showWeakChaptersOnly = false;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },
  },
  selectors: {
    selectFilteredChapters: (state) => {
      return state.chapters
        .filter(chapter => chapter.subject === state.selectedSubject)
        .filter(chapter => state.classFilters.length === 0 || state.classFilters.includes(chapter.class))
        .filter(chapter => state.unitFilters.length === 0 || state.unitFilters.includes(chapter.unit))
        .filter(chapter => !state.showWeakChaptersOnly || chapter.isWeakChapter)
        .filter(chapter => state.statusFilters.length === 0 || state.statusFilters.includes(chapter.status));
    }
  }
});

export const { 
  setChapters, 
  toggleClassFilter, 
  toggleUnitFilter, 
  toggleWeakChapters, 
  setSelectedSubject,
  toggleStatusFilter,
  clearAllFilters,
  setSortOption,
  setSortDirection
} = chaptersSlice.actions;
export const { selectFilteredChapters } = chaptersSlice.selectors;
export default chaptersSlice.reducer; 