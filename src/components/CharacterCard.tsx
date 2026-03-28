import { type Character } from "../types"
import { Link } from "react-router-dom"

interface Props{
    character: Character
}

function CharacterCard({character, index}: Props & {index: number}) {


    //destructure to get the props we need
    const {id, name, image, status, species, location } = character

    // to set a variable for the chreacter card
   let spanClass: string;
   let imageClass: string;
    
    switch(true){
      case (index % 7 === 0):
        spanClass = "col-span-2 row-span-2"
        imageClass = "h-3/4"
        break
        case (index % 7 === 3):
          spanClass = "col-span-1 row-span-2"
          imageClass = "h-4/5"
          break
          case (index % 7 === 6):
            spanClass = "col-span-2 row-span-1"
            imageClass = "h-3/4"
            break
            default:
              spanClass = "col-span-1 row-span-1"
              imageClass = "h-40"
    }

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
   
      <Link to={`/character/${id}`} className={`border-4 border-[#EBFF6E] flex flex-col items-center gap-2 px-2 py-4 bg-[#0D7C85] rounded-xl shadow-md h-full w-full ${spanClass} `}>
        <div className={`w-3 h-3 rounded-full ${activeColor} group relative`}></div>
        <h2 className="text-[#EBFF6E]  uppercase font-bangers tracking-tighter text-3xl font-bold">{name}</h2>
      <div className="  sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
       <div className="flex flex-col items-center gap-2 bg-white p-3 border-2 border-black uppercase font-grotesk font-bold tracking-tighter">
        <p>Species:</p>
        <p className="font-space-grotesk">{species}</p>

       </div>
       <div className="flex flex-col items-center gap-2 bg-white p-3 border-2 border-black uppercase font-grotesk font-bold tracking-tighter">
        <p>Status</p>
        <p className="">{status}</p>
       </div>
       
       <p>{location.name}</p>
       <p>{locationStatus}</p>
       
        
        
        </Link>
        
       
      
    
  )
}

export default CharacterCard
