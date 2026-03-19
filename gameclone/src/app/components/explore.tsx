'use client';

export default function ExploreCatalog() {
  const images = [
    "/car.jpg", 
    "/cyberpink.png",   
    "/god_of_war.png",  
    "/daysgone.jpg"
  ];

  // This helper calculates the "Fan" effect based on the card's position
  const getCardStyle = (index: number) => {
    const rotations = [-12, -4, 4, 12]; // Angles: Outer cards tilt more
    const yOffsets = [15, 0, 0, 15];   // Y-Axis: Creates the "U" shape
    const xOverlap = index === 0 ? '0px' : '-55px'; // Tight overlap

    return {
      marginLeft: xOverlap,
      transform: `rotate(${rotations[index]}deg) translateY(${yOffsets[index]}px)`,
      zIndex: 10 + index,
    };
  };

  return (
    <section className="mb-20 px-4 max-w-7xl mx-auto font-poppins">
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#151515] border border-white/5 rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden">
        
        {/* Left: The Dynamic Fan Stack */}
        <div className="flex items-center justify-center min-h-[250px] pl-10">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="w-36 h-48 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 hover:scale-110 hover:-translate-y-6 hover:z-[100] hover:rotate-0 cursor-pointer"
              style={getCardStyle(index)}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover" 
                alt="game cover" 
              />
            </div>
          ))}
        </div>

        {/* Right: Text Content */}
        <div className="max-w-md text-center md:text-left z-10">
          <h2 className="text-3xl font-bold text-white mb-5 uppercase tracking-tight leading-tight">
            Explore our Catalog
          </h2>
          <p className="text-gray-400 text-[16px] font-normal leading-relaxed mb-8">
            Browse by genre, features, price, and more to find your next favorite game.
          </p>
          <button className="bg-white text-black font-bold py-4 px-10 rounded-xl text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}