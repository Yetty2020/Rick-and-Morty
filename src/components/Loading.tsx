// Loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#0D7C85] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background "Warp" Effect */}
      <div className="absolute inset-0 opacity-20 animate-pulse bg-[radial-gradient(circle,_#EBFF6E_10%,_transparent_70%)]" />
      
      {/* The Floating Asset */}
      <div className="relative animate-bounce">
        {/* <img src={astro} alt="loading-astro" className="w-32 lg:w-48 rotate-12" /> */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 blur-lg rounded-full" />
      </div>

      <h2 className="mt-10 font-black text-4xl text-[#EBFF6E] uppercase italic tracking-tighter animate-pulse [text-shadow:4px_4px_0px_#000]">
        Relocating to Dimension...
      </h2>
      
      <p className="font-mono text-white/60 mt-2 uppercase text-sm">
        Initializing Portal Gun... 88%
      </p>
    </div>
  );
}