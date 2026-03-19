"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import { useGetAnnouncementsQuery, appApi } from '@/lib/apiSlice';
import { useDispatch } from 'react-redux';

export default function AnnouncementBar() {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  
  const { data, isLoading, error } = useGetAnnouncementsQuery();

  useEffect(() => {
    // Pro-tip: Using the environment variable we set in Vercel
    const socket = io('https://announcement-page.onrender.com', {
      transports: ['websocket'],
    });

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('announcement_updated', () => {
      dispatch(appApi.util.invalidateTags(['Announcement']));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-100 dark:bg-zinc-900 p-3 text-center animate-pulse text-zinc-500 text-sm font-medium">
        Checking for updates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-600 text-white p-2 text-xs md:text-sm text-center font-bold shadow-md">
        ⚠️ Connection Offline
      </div>
    );
  }

  const latestMsg = data?.[0];

  return (
    <div className="sticky top-0 z-50 w-full bg-blue-700 dark:bg-blue-800 text-white px-4 py-2.5 shadow-lg transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-3">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span 
            className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-zinc-400'}`} 
            title={isConnected ? "Live" : "Reconnecting..."}
          />
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold opacity-80">
            {isConnected ? 'Live' : 'Syncing'}
          </span>
        </div>

        {/* Announcement Text - Responsive Truncation */}
        <Link 
          href={latestMsg?.id ? `/announcement/${latestMsg.id}` : "#"} 
          className="flex-1 sm:flex-none text-center font-bold text-xs sm:text-sm tracking-wide hover:text-blue-200 transition-colors truncate max-w-[70vw] sm:max-w-none"
        >
          <span className="mr-1">📢</span>
          {latestMsg?.message || "No new announcements"}
        </Link>

        {/* Small "New" Badge for mobile visual pop */}
        {latestMsg && (
          <span className="sm:hidden bg-white/20 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">
            New
          </span>
        )}
      </div>
    </div>
  );
}