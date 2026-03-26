import CharacterCard from "./CharacterCard";
import { useCharacters } from "../useCharacters";
import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = ["Rick", "Morty", "Summer", "Beth", "Jerry"];

const Gallery = ({
  searchTerm,
  onSearchUpdate,
}: {
  searchTerm: string;
  onSearchUpdate: (val: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useCharacters(
    currentPage,
    searchTerm,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  if (loading && !data) return <div>Initial Portal Jump...</div>;
  // to check for not found error
  if (error) {
    const NotFound =
      error.message.toLowerCase().includes("404") ||
      error.message.toLowerCase().includes("not found");

    if (NotFound) {
      return (
        <div>
          <h3>No charater found for {searchTerm}</h3>
          <p>Maybe they're in another dimension</p>
        </div>
      );
    }

    return <div>Portal Failure: {error?.message}</div>;
  }

  //to check if data exists but results are empty
  const characters = data?.characters.results;
  if (!characters || characters?.length === 0) {
    return (
      <div>
        <p>Try searching for one of these instead:</p>
        <div>
          {SUGGESTIONS.map((name) => (
            <button key={name} onClick={() => onSearchUpdate(name)}>
              {name}
            </button>
          ))}
        </div>
        <button onClick={() => onSearchUpdate("")}>Show All Characters</button>
      </div>
    );
  }
  console.log(data);
  console.log(error);

  return (
    <section>
      <div className="grid lg:grid-cols-4 grid-flow-dense auto-rows-[250px] w-full gap-6 py-6 px-10 ">
        {data?.characters.results.map((character, index) => {
          return (
            <CharacterCard key={character.id} character={character} index={index} />
          );
        })}

        {/* Sentinel */}
        {/* each time this is crossed it triggers a new page */}
        <div ref={sentinelRef} className="">
          {loading && <p className="text-red-700">Loading...</p>}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
