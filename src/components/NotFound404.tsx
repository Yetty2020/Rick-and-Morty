import { Link } from "react-router-dom";

// NotFound404.tsx
export default function NotFound404() {
  return (
    <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating Assets as "Space Junk" */}
      {/* <img src={gun} className="absolute top-20 left-20 w-24 opacity-40 animate-spin-slow" />
      <img src={neptune} className="absolute bottom-40 right-20 w-32 opacity-30 animate-bounce" /> */}
      
      <div className="text-center z-10">
        <h1 className="text-[#EBFF6E] text-[15rem] font-black leading-none [text-shadow:10px_10px_0px_#0D7C85]">
          404
        </h1>
        <h2 className="text-white text-4xl font-bold uppercase -mt-10 mb-6 bg-black inline-block px-4">
          You're in the Wrong Dimension, Morty!
        </h2>
        
        <div className="flex gap-4 justify-center">
           <Link to="/" className="bg-[#EBFF6E] border-4 border-black px-10 py-4 font-black uppercase text-xl shadow-[8px_8px_0px_0px_#0D7C85] hover:shadow-none hover:translate-x-1 transition-all">
             Open Portal Home
           </Link>
        </div>
      </div>
    </div>
  );
}