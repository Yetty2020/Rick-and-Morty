import CharacterCard from "./CharacterCard";
import { useCharacters } from "../useCharacters";
import { useRef, useEffect } from "react";
//import Loading from "./Loading";
import CharacterError from "./CharacterError";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CharacterCardSkeleton from "./CharacterCardSkeleton";
import { ComicSticker } from "./ComicSticker";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 





const Gallery = ({
  searchTerm, onSearchUpdate, onReset
  
}: {
  searchTerm: string;
  onSearchUpdate: (val: string) => void;
  onReset: () => void;
  
}) => {
 
  const { loading, error, data, fetchMore } = useCharacters(
    1,
    searchTerm,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() =>{ 
    

    const cards = gsap.utils.toArray(".gallery-item")// 
   

    //to give each items item its logis 
    cards.forEach((card, index) =>{

      const element = card as HTMLElement

      gsap.to(element, {
       scale: 1, 
      opacity: 1,
     
     
      duration: 0.7,
      ease: "back.out(1.7)",
      
      delay: index * 0.05, 
      scrollTrigger: {
        trigger: element,
        start: "top 90%", 
       
        toggleActions: "play none none reverse",
        
        }
      })

    })


  }, {scope:container,  dependencies: [data]})

  useEffect(() => {
    // If there's no next page, don't bother watching the bottom
    if (!data?.characters.info.next) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // Check if we are at the bottom AND not currently loading
      if (entry.isIntersecting && !loading && data?.characters.info.next) {
        // 1. Tell Apollo to fetch the next page explicitly
        fetchMore({
          variables: {
            page: data.characters.info.next, // The API tells us exactly what the next number is
          },
        });
      }
    };

    const options = {
      root: null, // to observe the viewport
      rootMargin: "0px",
      threshold: 0.5, // to trigger the observer when 50% of the sentinel is visible
    };

    const observer = new IntersectionObserver(callback, options);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    
    return () => observer.disconnect();
  }, [data?.characters.info.next, loading, fetchMore]);

  // const handleNextButton = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((Prev) => Prev + 1);
  //     console.log("next button");
  //   }
  // };

  // const handlePrevButton = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((Prev) => Prev - 1);
  //     console.log("This Prev button has been clicked");
  //   }
  // };

  if (loading && !data) return <CharacterCardSkeleton index={10} />;
  // to check for not found error
  if (error) {
    const NotFound =
      error.message.toLowerCase().includes("404") ||
      error.message.toLowerCase().includes("not found");

    if (NotFound) {
      return (
       
        <CharacterError onSearchUpdate={() => onSearchUpdate("")} onReset={onReset}/>
      );
    }

    return <div className="min-h-screen text-center" >
      <h1 className="text-[#EBFF6E] text-[2rem] font-black leading-none ">
          Portal Failure: {error?.message}
        </h1>
      
      </div>;
  }

  //to check if data exists but results are empty
  const characters = data?.characters.results;
  if (!characters || characters?.length === 0) {
    return (
      <div>
        
        
        <CharacterError onSearchUpdate={() => onSearchUpdate("")} onReset={onReset}/>
      </div>
    );
  }
  console.log(data);
  console.log(error);

  return (
    <section className="lg:px-6 md:px-6 px-2   " >

     <div className=" ">
      <ComicSticker text="Kapow!" 
    position="top-0 -left-10 -rotate-12" 
    color="bg-cyan-400"/>
    <header className="relative w-full py-10 lg:py-20 flex flex-col items-center">
  

  <div className="smear-wrapper">
    {/* This is the butter spread */}
    <div className="paint-stroke"></div>

    {/* The Title sits on top */}
    <h1 className="relative z-10 text-5xl md:text-6xl lg:text-9xl font-black italic uppercase text-black tracking-tighter mix-blend-multiply">
      Character Portal
    </h1>
  </div>
</header>
<ComicSticker 
    text="Bam!" 
    position="top-2 -right-7 rotate-12" 
    color="bg-yellow-400" 
  />
    
  </div>
  <div className="grid lg:grid-cols-4 grid-flow-dense auto-rows-[minmax(150px,auto)] w-full gap-6 py-6 px-2 md:px-10 lg:px-20 bg-[#0F3A40]  " ref={container}>
        {data?.characters.results.map((character, index) => {
          return (

           
               <CharacterCard key={character.id} character={character} index={index} className="block gallery-item opacity-0 scale-50"  />
          
           
          );
        })}

        {/* Sentinel */}
        {/* each time this is crossed it triggers a new page */}
        <div ref={sentinelRef} className="">
          {loading && <div className="mt-4 flex flex-col items-center gap-3">
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
      </div>}
        </div>
      </div>

      
    </section>
  );
};

export default Gallery;
