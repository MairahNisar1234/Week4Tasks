import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FilterState {
  selectedFilters: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      selectedFilters: [],
      addFilter: (filter) =>
        set((state) => ({
          selectedFilters: state.selectedFilters.includes(filter)
            ? state.selectedFilters
            : [...state.selectedFilters, filter],
        })),
      removeFilter: (filter) =>
        set((state) => ({
          selectedFilters: state.selectedFilters.filter((f) => f !== filter),
        })),
      clearFilters: () => set({ selectedFilters: [] }),
    }),
    { 
      name: 'job-listing-storage',
      storage: createJSONStorage(() => localStorage), 
      skipHydration: true, // 
    }
  )
);