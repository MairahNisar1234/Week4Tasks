"use client";
import ThemeToggle from "./components/themeToggle";
import data from "./data.json"; 
import JobCard from "./components/jobCard";
import FilterBar from "./components/filterBar";
import { useFilterStore } from "./store/useFilterStore";

export default function Home() {
  const { selectedFilters } = useFilterStore();

  const filteredJobs = data.filter((job) => {
    if (selectedFilters.length === 0) return true;
    
    // Combine attributes for filtering
    const jobTags = [
      job.role, 
      job.level, 
      ...(job.languages || []), 
      ...(job.tools || [])
    ];
    
    return selectedFilters.every((filter) => jobTags.includes(filter));
  });

  return (
  
    <main className="min-h-screen bg-cyan-50 dark:bg-zinc-950 transition-colors duration-300 pb-20">
      
      <header className="bg-cyan-700 h-40 bg-[url('/images/bg-header-desktop.svg')] bg-cover relative">
     <ThemeToggle/>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        <FilterBar />
        
        <div className={`flex flex-col gap-6 ${selectedFilters.length > 0 ? 'mt-8' : 'mt-16'}`}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-20">
              <h2 className="text-cyan-800 dark:text-cyan-400 font-bold text-xl">
                No jobs match your selected filters.
              </h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}