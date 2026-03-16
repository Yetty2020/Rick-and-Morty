import { type Character } from "../types"

interface Props{
    character: Character
}

function CharacterCard({character}: Props) {

    //destructure to get the props we need
    const { name, image, status, species } = character
  return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <p>{status} - {species}</p>
      
    </div>
  )
}

export default CharacterCard
