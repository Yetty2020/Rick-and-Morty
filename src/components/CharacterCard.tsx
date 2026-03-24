import { type Character } from "../types"
import { Link } from "react-router-dom"

interface Props{
    character: Character
}

function CharacterCard({character}: Props) {


    //destructure to get the props we need
    const {id, name, image, status, species, location } = character

    //lookup object to map status to colors
    const statusMap: Record<string, string> ={
      "alive" : "bg-green-500",
      "dead" : "bg-red-500",
      "unknown" : "bg-gray-500"
    }

    // to change it to lowercas to match the keys in the statusMap
    const statusKey = status.toLowerCase()

    // to compare result from api with that from the lookup object
    const activeColor = statusMap[statusKey as keyof typeof statusMap] || "bg-gray-500"

    //to compare the status to the locations
    let locationStatus: string;

    switch(status.toLowerCase()){
      case "alive":
        locationStatus = `You can find me in ${location.name}`
        break
      case "dead":
        locationStatus = `I was last seen in ${location.name}`
        break
        default:
          locationStatus = `I am alive but in an undisclosed location`
    }
  return (
   
      <Link to={`/character/${id}`} className="border-4 border-[#EBFF6E] flex flex-col items-center gap-2 px-2 py-4 bg-[#0D7C85] rounded-xl shadow-md">
        <div className={`w-3 h-3 rounded-full ${activeColor} group relative`}></div>
      <img src={image} alt={name}  className="rounded-full w-28 "/>
       <h2 className="text-[#EBFF6E]">{name}</h2>
       <p>{species}</p>
       <p>{location.name}</p>
       <p>{locationStatus}</p>
        
        
        </Link>
        
       
      
    
  )
}

export default CharacterCard
