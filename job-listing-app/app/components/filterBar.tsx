"use client";
import { useFilterStore } from "../store/useFilterStore";

export default function FilterBar() {
  const { selectedFilters, removeFilter, clearFilters } = useFilterStore();

  if (selectedFilters.length === 0) return null;

  return (
    <div className="filter-container animate-in fade-in slide-in-from-top-4 duration-300">
      
      <div className="flex flex-wrap gap-4">
        {selectedFilters.map((filter) => (
          <div key={filter} className="filter-tag-active">
            <span className="px-2 py-1 text-sm md:text-base">
              {filter}
            </span>
            
            <button 
              onClick={() => removeFilter(filter)}
              className="remove-btn h-full flex items-center justify-center group"
              aria-label={`Remove ${filter}`}
            >
              <img 
                src="/images/icon-remove.svg" 
                alt="" 
                className="w-3 h-3 transition-transform group-hover:rotate-90" 
              />
            </button>
          </div>
        ))}
      </div>
      
      <button 
        onClick={clearFilters}
        className="text-cyan-700 dark:text-cyan-400 font-bold hover:underline hover:text-cyan-800 dark:hover:text-cyan-300 transition-all ml-4"
      >
        Clear
      </button>
    </div>
  );
}