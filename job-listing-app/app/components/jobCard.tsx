"use client";
import { useFilterStore } from "../store/useFilterStore";

interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export default function JobCard({ job }: { job: Job }) {
  const { addFilter } = useFilterStore();

  const tags = [job.role, job.level, ...job.languages, ...job.tools];

  return (
    <div className="job-card">
  <div className="flex flex-col md:flex-row items-center w-full md:justify-between gap-6">
    
    {/* 1. Left Side: Image and Info */}
    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
      <img src={job.logo} alt="" className="w-12 h-12 md:w-20 md:h-20 -mt-12 md:mt-0" />
      
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
          <span className="text-primary font-bold">{job.company}</span>
          {job.new && <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">New!</span>}
        </div>
        
        <h1 className="font-bold text-lg dark:text-zinc-100 hover:text-primary cursor-pointer">
          {job.position}
        </h1>
        
        <p className="text-darkGrayishCyan dark:text-zinc-400 text-sm mt-1">
          {job.postedAt} • {job.contract} • {job.location}
        </p>
      </div>
    </div>

    {/* 2. Right Side: The Tag */}
    <div className="flex flex-wrap gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-zinc-200 dark:border-zinc-800 w-full md:w-auto md:ml-auto justify-center md:justify-end">
      {tags.map((tag) => (
        <button 
          key={tag} 
          onClick={() => addFilter(tag)}
          className="tag"
        >
          {tag}
        </button>
      ))}
    </div>

  </div>
</div>
  );
}