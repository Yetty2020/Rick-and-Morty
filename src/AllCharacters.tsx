import { useQuery } from "@apollo/client/react"
import { GET_CHARACTERS } from "./queries"
import { type CharactersResponse, type CharactersVars } from "./types"
import Loading from "./components/Loading";

const AllCharacters = () => {
  const { loading, error, data, fetchMore } = useQuery<CharactersResponse, CharactersVars>(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <div><Loading/></div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data)
  

  return { data, loading, error, fetchMore };

  return (
    <div>
         All Characters
         <div>
            {
                data?.characters.results.map((character) => {
                    return(
                        <div key={character.id}>{character.name}
                        <img src={character.image} alt={character.name} />
                        <p>{character.status} - {character.species}</p>
                        </div>
                        
                    )
                })
            }
         </div>
      
    </div>
  )
}

export default AllCharacters
