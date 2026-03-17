"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 w-28 mb-4" />; 

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex items-center gap-3 px-5 py-2.5 rounded-xl shadow-xl 
                 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-xl
                 border border-white/20 dark:border-cyan-500/30
                 transition-all duration-300 hover:border-white/50 dark:hover:border-cyan-400
                 hover:shadow-cyan-500/20"
    >
      {/* Animated Icon Container */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <span className="text-xl animate-in zoom-in spin-in-90 duration-500">☀️</span>
        ) : (
          <span className="text-xl animate-in zoom-in -spin-in-90 duration-500">🌙</span>
        )}
      </div>

      {/* Text with Letter Spacing */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
        {isDark ? "Light" : "Dark"}
      </span>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-white/5 to-cyan-400/0 
                      opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}