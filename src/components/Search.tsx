import { useEffect, useState} from "react"

function Search() {

    const [searchItem, setSearchItem ] = useState("")
    //debounce value to trigger API fetch
    const [debouncedSearchItem, setDebouncedSearchItem] = useState("")

    // the timer
    useEffect(() =>{
        const handler = setTimeout(() =>{
            setDebouncedSearchItem(searchItem)
        }, 1000) // delay of 500ms

        //to handle the cleanup
        //cancels the previous timer and starts a new one if the user types before the delay is over
        return () =>{
            clearTimeout(handler)

        }
    }, [searchItem])// this effect runs every time the searchItem changes

  return (
    <div>
        <div>
            <input type="text" placeholder="Search for a character..." value={searchItem} onChange={(event) =>{setSearchItem(event.target.value)
            

        }}/>
        {searchItem && <button onClick={() =>{setSearchItem("")}}>Clear</button>}
        </div>
        
            <button>Search</button>
            <p>{searchItem}</p>
            <p>{debouncedSearchItem}</p>
      
    </div>
  )
}

export default Search
