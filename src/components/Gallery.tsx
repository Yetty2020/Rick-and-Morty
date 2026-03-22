import CharacterCard from "./CharacterCard";
import { useCharacters } from "../useCharacters";
import { useState } from "react";

const SUGGESTIONS = ["Rick", "Morty", "Summer", "Beth", "Jerry"];

const Gallery = ({
  searchTerm,
  onSearchUpdate,
}: {
  searchTerm: string;
  onSearchUpdate: (val: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useCharacters(currentPage, searchTerm);

  const totalPages: number = data?.characters.info.pages || 0;

  const handleNextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage((Prev) => Prev + 1);
      console.log("next button");
    }
  };

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage((Prev) => Prev - 1);
      console.log("This Prev button has been clicked");
    }
  };

  if (loading) return <div>Loading...</div>;

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
            <div>{SUGGESTIONS.map((name) =>(
                <button key={name}  onClick={() =>onSearchUpdate(name)}>{name}</button>
            ))}</div>
            <button onClick={() =>onSearchUpdate("")}>Show All Characters</button>
        </div>
    );
  }
  console.log(data);
  console.log(error);

  return (
    <div>
      <div>
        <button onClick={handlePrevButton} disabled={currentPage === 1}>
          Previous
        </button>
        <p>
          page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextButton}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div>
        {data?.characters.results.map((character) => {
          return (
            <section>
              <CharacterCard key={character.id} character={character} />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
