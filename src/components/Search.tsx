import { useEffect, useState} from "react"

function Search({onSearchChange, currentValue}: {onSearchChange: (val: string) => void; currentValue: string}) {

    const [searchItem, setSearchItem] = useState(currentValue);
    //debounce value to trigger API fetch

    useEffect(() => {
    setSearchItem(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      // Only trigger if the value is actually different to avoid loops
      if (searchItem !== currentValue) {
        onSearchChange(searchItem);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchItem, onSearchChange, currentValue]);
   

   
  return (
    <div className="py-4 mb-2">
        <div className=" text-white flex items-center justify-center w-full">
            <div className="bg-[#407772] p-2 rounded-md flex items-center justify-between w-full max-w-xl">
                <input type="text" placeholder="Find a character..." value={currentValue} onChange={(event) =>{setSearchItem(event.target.value) 
            

        }} className="outline-none border-none text-white focus-none w-full flex-1 bg-transparent " />
        

        
        {searchItem ? <button onClick={() =>{setSearchItem("")}}>Clear</button> : <button className="opacity-70">Search</button>}

            </div>
            
        
        </div>
        
            
            
            
      
    </div>
  )
}

export default Search
