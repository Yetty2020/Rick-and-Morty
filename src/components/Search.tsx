import { useEffect, useState} from "react"

function Search({onSearchChange}: {onSearchChange: (val: string) => void}) {

    const [searchItem, setSearchItem ] = useState("")
    //debounce value to trigger API fetch
   

    // the timer
    useEffect(() =>{
        const handler = setTimeout(() =>{
           
                onSearchChange(searchItem)
        }, 1000) // delay of 500ms

        //to handle the cleanup
        //cancels the previous timer and starts a new one if the user types before the delay is over
        return () =>{
            clearTimeout(handler)

        }
    }, [searchItem, onSearchChange])// this effect runs every time the searchItem changes

  return (
    <div className="py-4">
        <div className=" text-white flex items-center justify-center w-full">
            <div className="bg-[#407772] p-2 rounded-md flex items-center justify-between w-full max-w-xl">
                <input type="text" placeholder="Find a character..." value={searchItem} onChange={(event) =>{setSearchItem(event.target.value) 
            

        }} className="outline-none border-none text-white focus-none w-full flex-1 bg-transparent " />
        

        
        {searchItem ? <button onClick={() =>{setSearchItem("")}}>Clear</button> : <button className="opacity-70">Search</button>}

            </div>
            
        
        </div>
        
            
            
            
      
    </div>
  )
}

export default Search
