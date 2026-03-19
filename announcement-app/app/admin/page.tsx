"use client";
import { useState } from 'react';
import { useAddAnnouncementMutation } from '@/lib/apiSlice';

export default function AdminPage() {
  const [msg, setMsg] = useState("");
  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();

  const updateAnnouncement = async () => {
    if (!msg.trim()) return;

    try {
      await addAnnouncement(msg).unwrap(); 
      setMsg(""); 
      alert("Announcement Sent!");
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Error sending announcement. Check console.");
    }
  };

  return (
    // Flex-col and justify-center help it look centered on mobile and desktop
    <div className="flex flex-col items-center justify-start sm:justify-center min-h-screen bg-zinc-50 dark:bg-black px-4 py-10 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md md:max-w-lg bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Broadcast a new message to all live users instantly.
          </p>
        </div>

        <textarea 
          className="w-full p-4 text-base border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:focus:ring-blue-400 placeholder-zinc-400"
          placeholder="Type new announcement..."
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <button 
          onClick={updateAnnouncement}
          disabled={isLoading || !msg.trim()}
          className={`w-full mt-6 px-6 py-3 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all ${
            isLoading || !msg.trim()
              ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed text-zinc-500" 
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Broadcasting...
            </span>
          ) : "Push Live Update"}
        </button>
      </div>

      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-widest font-semibold">
        Secure Admin Access Only
      </p>
    </div>
  );
}