"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-8 py-4 sticky top-[44px] sm:top-[48px] z-40 shadow-sm backdrop-blur-md bg-white/80 dark:bg-black/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 8h4m-4 4h8" />
            </svg>
          </div>
          <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">
            News<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl sm:bg-transparent sm:dark:bg-transparent">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              pathname === '/' 
                ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm sm:shadow-none sm:bg-transparent sm:dark:bg-transparent' 
                : 'text-zinc-500 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/admin" 
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              pathname === '/admin' 
                ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm sm:shadow-none sm:bg-transparent sm:dark:bg-transparent' 
                : 'text-zinc-500 hover:text-blue-600'
            }`}
          >
            Admin
          </Link>
        </div>
        
      </div>
    </nav>
  );
}