export const ComicSticker = ({ text, position, color = "bg-yellow-400" } : { text: string; position: string; color?: string }) => {
  return (
    <div className={`absolute ${position} z-0 transform hover:scale-110 fixed transition-transform cursor-default select-none hidden md:block`}>
      {/* The "Explosion" background layer (Black border) */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-black translate-x-1 translate-y-1" 
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', scale: '1.2' }}
        />
        
        {/* The Colored Starburst */}
        <div 
          className={`${color} p-8 flex items-center justify-center`}
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        >
          <span className="text-black font-black italic text-xl md:text-3xl uppercase tracking-tighter drop-shadow-sm">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};