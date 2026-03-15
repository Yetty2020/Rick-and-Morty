import { type Character } from "../types"

interface Props{
    character: Character
}

function CharacterCard({character}: Props) {

    //destructure to get the props we need
    const { name, image, status, species } = character
  return (
    <div>
      
    </div>
  )
}

export default CharacterCard
