const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`bg-[#0f2a0f] rounded-md relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-[#00ff4112] to-transparent" />
  </div>
);

const ScanlineOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none rounded-sm"
    style={{
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)",
    }}
  />
);

function CharacterCardSkeleton({ index }: { index: number }) {
  

  return (
    <div
      className={` border-[#0f2a0f] grid grid-cols-1 lg:grid-cols-4 p-4 rounded-sm relative  overflow-hidden gap-5`}
      style={{ animationDelay: `${(index % 7) * 0.15}s` }}
    >
    

      {/* TOP: Skeletal Layout Block */}
      <div className=" col-span-2 row-span-3  space-y-3 mb-4 border-4 border-[#0f2a0f] p-4 rounded-xl flex flex-col justify-between items-center bg-[#060d06]">
          <ScanlineOverlay />
        <SkeletonBlock className="h-15 w-2/4 rounded-md" />
        <div className="flex justify-between gap-4">
            <SkeletonBlock className=" h-15 w-15"/>
            <SkeletonBlock className=" h-15 w-15"/>
        </div>
        <SkeletonBlock className="h-48 w-48 opacity-40 rounded-sm" />
      </div>
      <div className=" h-64 space-y-3 mb-4 border-4 border-[#0f2a0f] p-4 rounded-xl flex flex-col justify-between items-center bg-[#060d06]">
        <SkeletonBlock className="h-6 w-3/4" />
         <SkeletonBlock className="h-40 w-40 opacity-40 rounded-sm" />
      </div>
      <div className=" h-64 space-y-3 mb-4 border-4 border-[#0f2a0f] p-4 rounded-xl flex flex-col justify-between items-center bg-[#060d06]">
        <SkeletonBlock className="h-6 w-3/4" />
         <SkeletonBlock className="h-40 w-40 opacity-40 rounded-sm" />
      </div>
      <div className=" col-span-2 h-64 space-y-3 mb-4 border-4 border-[#0f2a0f] p-4 rounded-xl flex  gap-6 justify-between items-center bg-[#060d06]">
        <SkeletonBlock className="h-6 w-1/4" />
         <SkeletonBlock className="h-40 w-40 opacity-40 rounded-sm" />
      </div>
      

      {/* BOTTOM: Animated Spinner and Pulse Text */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {/* The Animating Spin */}
        <div
          className="w-10 h-10 rounded-full border-2 border-[#00ff4122] border-t-[#00ff4166] animate-spin"
          style={{ animationDuration: "1.2s" }}
        >
          <div
            className="w-5 h-5 rounded-full border-2 border-[#00ff4115] border-b-[#00ff4144] animate-spin mt-1 mx-auto"
            style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
          />
        </div>

        {/* The Pulse Text */}
        <p className="text-[12px] text-white font-mono uppercase tracking-[5px] animate-pulse">
          portal connection...
        </p>
      </div>
    </div>
  );
}

export default CharacterCardSkeleton