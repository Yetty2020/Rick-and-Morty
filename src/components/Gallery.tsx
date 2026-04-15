import CharacterCard from "./CharacterCard";
import { useCharacters } from "../useCharacters";
import { useState, useRef, useEffect } from "react";
import Loading from "./Loading";
import CharacterError from "./CharacterError";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 


// const SUGGESTIONS = ["Rick", "Morty", "Summer", "Beth", "Jerry"];



const Gallery = ({
  searchTerm, onSearchUpdate, onReset
  
}: {
  searchTerm: string;
  onSearchUpdate: (val: string) => void;
  onReset: () => void;
  
}) => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useCharacters(
    currentPage,
    searchTerm,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() =>{ 
    // if (loading || !data?.results) return;

    const cards = gsap.utils.toArray(".gallery-item")// to get all items in the list
    // const randomRot = Math.floor(Math.random() * 3) - 1;
   

    //to give each items item its logis 
    cards.forEach((card, index) =>{

      const element = card as HTMLElement

      gsap.to(element, {
       scale: 1, 
      opacity: 1,
     
     
      duration: 0.7,
      ease: "back.out(1.7)",
      // The secret sauce: small delay for the first cards
      // This makes them pop one-by-one on page load
      delay: index * 0.15, 
      scrollTrigger: {
        trigger: element,
        start: "top 90%", // Trigger earlier so they pop as they enter
       
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

    // Always clean up to prevent memory leaks!
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

  if (loading && !data) return <Loading/>;
  // to check for not found error
  if (error) {
    const NotFound =
      error.message.toLowerCase().includes("404") ||
      error.message.toLowerCase().includes("not found");

    if (NotFound) {
      return (
        // <div>
        //   <h3>No charater found for {searchTerm}</h3>
        //   <p>Maybe they're in another dimension</p>
        // </div>
        <CharacterError onSearchUpdate={() => onSearchUpdate("")} onReset={onReset}/>
      );
    }

    return <div className="min-h-screen text-center" >
      <h1 className="text-[#EBFF6E] text-[5rem] font-black leading-none [text-shadow:10px_10px_0px_#0D7C85]">
          Portal Failure: {error?.message}
        </h1>
      
      </div>;
  }

  //to check if data exists but results are empty
  const characters = data?.characters.results;
  if (!characters || characters?.length === 0) {
    return (
      <div>
        {/* <p>Try searching for one of these instead:</p>
        <div>
          {SUGGESTIONS.map((name) => (
            <button key={name} onClick={() => onSearchUpdate(name)}>
              {name}
            </button>
          ))}
        </div> */}
        
        <CharacterError onSearchUpdate={() => onSearchUpdate("")} onReset={onReset}/>
      </div>
    );
  }
  console.log(data);
  console.log(error);

  return (
    <section >
  <div className="grid lg:grid-cols-4 grid-flow-dense auto-rows-[minmax(150px,auto)] w-full gap-6 py-6 px-10 bg-[#0F3A40] " ref={container}>
        {data?.characters.results.map((character, index) => {
          return (

           
               <CharacterCard key={character.id} character={character} index={index} className="block gallery-item opacity-0 scale-50"  />
          
           
          );
        })}

        {/* Sentinel */}
        {/* each time this is crossed it triggers a new page */}
        <div ref={sentinelRef} className="">
          {loading && <Loading/>}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
