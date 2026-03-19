'use client';
import { useEffect } from 'react';
import { Game, useGameStore } from '../store/useGameStore';
import Link from 'next/link';

export default function HeroSlider({ games }: { games: Game[] }) {
  const { selectedHero, setSelectedHero } = useGameStore();

  const active = selectedHero || games[0];

  // 1. AUTO-SLIDE LOGIC
  useEffect(() => {
    if (!games || games.length === 0) return;

    const timer = setInterval(() => {
      const currentIndex = games.findIndex((g) => g.id === active.id);
      const nextIndex = (currentIndex + 1) % games.length;
      setSelectedHero(games[nextIndex]);
    }, 5000);

    return () => clearInterval(timer);
  }, [active.id, games, setSelectedHero]);

  if (!active) return null;

  return (
    // 'items-stretch' ensures the right column height equals the left image height
    <div className="flex flex-col lg:flex-row gap-4 mb-12 font-poppins items-stretch">
      
      {/* LEFT SIDE: Main Banner (Flexible 4/5 width) */}
      <div className="relative flex-[4] aspect-[16/9] rounded-3xl overflow-hidden group border border-white/5">
        <img 
          src={active.image} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt={active.title}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent p-8 flex flex-col justify-end">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 uppercase tracking-tighter">
            {active.title}
          </h2>
          
          <p className="font-normal text-sm md:text-base text-gray-200 mb-6 max-w-[600px] leading-relaxed">
            {active.description}
          </p>
          
          <Link href={`/game/${active.id}`}>
            <button className="bg-white text-black font-bold py-3.5 px-10 rounded-lg w-fit text-[11px] uppercase hover:bg-gray-200 transition-all active:scale-95 shadow-lg">
              {active.isFree ? "Play for Free" : active.freeUntil === "coming soon" ? "Pre-Purchase Now" : `Buy Now - ₹${active.originalPrice?.toLocaleString()}`}
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Thumbnails (Flexible 1/5 width) */}
      <div className="flex flex-col gap-2 flex-1 lg:max-w-[250px]">
        {games.map((game) => (
          <div 
            key={game.id}
            onClick={() => setSelectedHero(game)} 
            // 'flex-1' on each div makes them expand to fill the right column height equally
            className={`relative flex-1 flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
              active.id === game.id ? 'bg-[#2A2A2A]' : 'hover:bg-white/5'
            }`}
          >
            {active.id === game.id && (
              <div className="absolute bottom-0 left-0 h-[2px] bg-white animate-slider-progress w-full origin-left" />
            )}

            <img 
              src={game.image} 
              className={`w-10 h-14 object-cover rounded-md shadow-md transition-opacity duration-300 ${
                active.id === game.id ? 'opacity-100' : 'opacity-50'
              }`} 
              alt={game.title}
            />
            
            <span className={`text-[13px] font-medium leading-tight transition-colors ${
              active.id === game.id ? 'text-white' : 'text-gray-400'
            }`}>
              {game.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}