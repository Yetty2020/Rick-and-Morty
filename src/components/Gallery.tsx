


import CharacterCard from "./CharacterCard";
import { useCharacters } from "../useCharacters";

const Gallery = ({ searchTerm }: { searchTerm: string }) => {
  const { loading, error, data } = useCharacters(1, searchTerm)

  if (loading) return <div>Loading...</div>;

  // to check for not found error 
  if (error){
    if (error.message.includes("404") || error.message.includes("not found")){
        return <div>
            <h3>No characters found for {searchTerm}</h3>
            <p>Maybe they're in another dimension</p>
        </div>
    }
    return 
        <div>Portal Failure: {error.message}</div>
    
  }
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
