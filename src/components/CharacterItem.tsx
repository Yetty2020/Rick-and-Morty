import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"; 
import axios, { type AxiosResponse } from "axios";


interface CharacterItemProps {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
}

function CharacterItem() {
    const [character, setCharacter] = useState<CharacterItemProps | null>(null);
    const [loading, setLoading ] = useState(true)
    const {id}= useParams<{id: string}>();

   

    useEffect(() =>{
        const getCharacterData = async () =>{
            try{
                setLoading(true)
                const response: AxiosResponse<CharacterItemProps> = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
;
console.log(response.data) 
setCharacter(response.data)
           } catch(error){
    console.error(error)
} finally{
    setLoading(false)
}
        } 

        if (id){
              getCharacterData()

        }
       

        
        }

       

    , [id])

     if (loading){
        return <div>Loading...</div>
    }
    if (!character){
        return <div>Character not found</div>
    }
  return (
    <div>
        This is the charactr Item
        <p>{id}</p>
        <div>
            {character?.name}
            <img src={character?.image} alt={character?.name} />
            <p>{character?.status} - {character?.species}</p>
        </div>
      
    </div>
  )
}

export default CharacterItem
