import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../queries";
import type { CharactersResponse, CharactersVars } from "../types";
import CharacterCard from "./CharacterCard";

const Gallery = () => {
  const { loading, error, data } = useQuery<CharactersResponse, CharactersVars>(GET_CHARACTERS, {
    variables: { page: 1,
     },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data)

  return (
    <div>
         All Characters
         <div>
            {
                data?.characters.results.map((character) => {
                    return(
                        <CharacterCard  key={character.id} character={character} />
                        
                    )
                })
            }
         </div>
      
    </div>
  )
}

export default Gallery
