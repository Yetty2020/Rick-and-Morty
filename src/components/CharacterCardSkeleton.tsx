const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`bg-[#0f2a0f] rounded-md relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-[#00ff4112] to-transparent" />
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
  // Mirror exact spanClass logic from CharacterCard
  let spanClass: string;

  switch (true) {
    case index % 7 === 0:
      spanClass = "col-span-1 row-span-2 md:col-span-2 md:row-span-2";
      break;
    case index % 7 === 3:
      spanClass = "col-span-1 row-span-2 md:col-span-1 md:row-span-2";
      break;
    case index % 7 === 6:
      spanClass = "col-span-1 row-span-1 md:col-span-2 md:row-span-1";
      break;
    default:
      spanClass = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
  }

  const isLarge = index % 7 === 0;
  const isMediumTall = index % 7 === 3;
  const isWide = index % 7 === 6;
//   const showDetails = isLarge || isMediumTall;

  return (
    <div
      className={`border-4 border-[#0f2a0f] flex flex-col items-center px-2 py-4 rounded-sm relative bg-[#060d06] ${spanClass} `}
      style={{ animationDelay: `${(index % 7) * 0.15}s` }}
    >
      <ScanlineOverlay />

      <div className="flex flex-col w-full h-full gap-3">
        {/* Name placeholder */}
        <SkeletonBlock
          className={`h-full w-3/4 mx-auto ${isLarge ? "md:h-48" : isMediumTall ? "md:h-10" : "md:h-8"}`}
        />
        <SkeletonBlock
          className={`h-full w-3/4 mx-auto ${isLarge ? "md:h-48" : isMediumTall ? "md:h-10" : "md:h-8"}`}
        />
        <SkeletonBlock
          className={`h-full w-3/4 mx-auto ${isLarge ? "md:h-48" : isMediumTall ? "md:h-10" : "md:h-8"}`}
        />
        <SkeletonBlock
          className={`h-full w-3/4 mx-auto ${isLarge ? "md:h-48" : isMediumTall ? "md:h-10" : "md:h-8"}`}
        />
        

        <div className="flex flex-col gap-3 flex-1">
          {/* Details row — only for large and medium-tall cards */}
          

          {/* Image placeholder */}
          <div
            className={`relative overflow-hidden rounded-xl w-full flex-1 bg-[#0a140a] ${
              isLarge
                ? "min-h-48 md:min-h-64"
                : isMediumTall
                  ? "min-h-40 md:min-h-56"
                  : isWide
                    ? "min-h-32 md:min-h-44"
                    : "min-h-32 md:min-h-40"
            }`}
          >
            {/* Portal ring centered on image area */}
            <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
              <div
                className="w-10 h-10 rounded-full border-2 border-[#00ff4122] border-t-[#00ff4166] animate-spin"
                style={{ animationDuration: "1.2s" }}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 border-[#00ff4115] border-b-[#00ff4144] animate-spin mt-2 mx-auto"
                  style={{
                    animationDuration: "0.8s",
                    animationDirection: "reverse",
                  }}
                />
              </div>
              <p
            className="text-[15px] text-[#1a4a1a] font-mono text-center tracking-[1px] animate-pulse"
          >
            portal connection established...
          </p>
            </div>

            {/* Shimmer sweep over image */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-[#00ff4108] to-transparent" />
            <ScanlineOverlay />
          </div>

          {/* Location bubble — only for large cards */}
          {isLarge && (
            <div className="flex flex-col gap-1 border-2 border-[#0f2a0f] p-4 rounded-3xl self-end w-32">
              <SkeletonBlock className="h-2 w-full" />
              <SkeletonBlock className="h-2 w-3/4" />
              <SkeletonBlock className="h-2 w-1/2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCardSkeleton;