"use client";

import { useGetAnnouncementsQuery, Announcement } from "@/lib/apiSlice";
import Link from "next/link";

export default function Home() {
  const { data: announcements, isLoading, isError } = useGetAnnouncementsQuery();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Live System Active</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black dark:text-zinc-50 mb-4">
            Real-Time Broadcast Feed
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Current active updates from the central cloud server. Stay informed with instant notifications.
          </p>
        </div>

        {/* The Live Feed Grid - Fully Responsive */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
            ))
          ) : isError ? (
            <div className="col-span-full p-6 md:p-8 text-center text-red-500 font-medium border border-red-200 rounded-2xl bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
              ⚠️ Unable to connect to the broadcast server. It might be waking up—please refresh in a moment.
            </div>
          ) : (
            announcements?.map((post: Announcement) => (
              <Link key={post.id} href={post.id ? `/announcement/${post.id}` : "#"} className="flex">
                <div className="group w-full p-5 md:p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                        Update
                      </span>
                      <span className="text-zinc-400 text-xs">
                        {post.date ? new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent"}
                      </span>
                    </div>
                    <p className="text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                      {post.message}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center text-blue-500 dark:text-blue-400 font-medium text-sm">
                    Read Details 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && !isError && announcements?.length === 0 && (
          <div className="text-center py-16 md:py-24 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-lg italic">The feed is currently quiet. Check back later!</p>
          </div>
        )}

      </main>
    </div>
  );
}