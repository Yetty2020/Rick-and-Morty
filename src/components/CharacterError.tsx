// CharacterError.tsx


import { useNavigate } from "react-router-dom";

export default function CharacterNotFound({ onSearchUpdate, onReset }: { onSearchUpdate?: () => void; onReset?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen  flex items-center justify-center p-6">
      <div className="max-w-2xl w-full border-4 border-[#EBFF6E] p-10 bg-[#1a1a1a] shadow-[15px_15px_0px_0px_#EBFF6E] -rotate-1 relative">
        <div className="absolute top-0 right-0 bg-[#EBFF6E] text-black px-4 py-1 font-bold uppercase text-xs">
          Galactic Error 404
        </div>
        
        <h1 className="text-white font-black text-2xl md:text-3xl lg:text-7xl uppercase mb-4 leading-none">
          File <span className="bg-[#EBFF6E] px-2 text-black">Redacted</span>
        </h1>
        
        <p className="text-gray-400 font-mono  text-md  md:text-lg mb-8">
          The character you are looking for has been erased from this timeline by the Council of Ricks. No biological signatures detected.
        </p>

        <button
          onClick={() => {
            if (onSearchUpdate) {
              onSearchUpdate();
            } else {
              navigate("/");
            }
          }}
          className="bg-white text-black px-8 py-3 font-bold border-4 border-black shadow-[6px_6px_0px_0px_#EBFF6E] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase"
        >
          Return to Citadel
        </button>
        
        
      </div>
    </div>
  );
}