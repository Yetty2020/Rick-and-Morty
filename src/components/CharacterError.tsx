// CharacterError.tsx


export default function CharacterNotFound({ onSearchUpdate }: { onSearchUpdate: () => void }) {
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full border-4 border-red-600 p-10 bg-[#1a1a1a] shadow-[15px_15px_0px_0px_#cc0000] -rotate-1 relative">
        <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 font-bold uppercase text-xs">
          Galactic Error 404
        </div>
        
        <h1 className="text-white font-black text-7xl uppercase mb-4 leading-none">
          File <span className="bg-red-600 px-2 text-black">Redacted</span>
        </h1>
        
        <p className="text-gray-400 font-mono text-lg mb-8">
          The character you are looking for has been erased from this timeline by the Council of Ricks. No biological signatures detected.
        </p>

        <button 
          onClick={() => onSearchUpdate()} 
          className="bg-white text-black px-8 py-3 font-bold border-4 border-black shadow-[6px_6px_0px_0px_#red-600] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase"
        >
          Return to Citadel
        </button>
        
        
      </div>
    </div>
  );
}