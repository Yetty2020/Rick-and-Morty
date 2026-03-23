import { type Character } from "../types"
import { Link } from "react-router-dom"

interface Props{
    character: Character
}

function CharacterCard({character}: Props) {

    //destructure to get the props we need
    const {id, name, image, status, species } = character
  return (
   
      <Link to={`/character/${id}`} className="border-2 border-[#EBFF6E] flex flex-col items-center gap-2 ">
      <img src={image} alt={name}  className="rounded-full w-28 "/>
       <h2 className="text-[#EBFF6E]">{name}</h2>
       <p>{species}</p>
        
        <p>{status} - </p></Link>
       
      
    
  )
}

export default CharacterCard
