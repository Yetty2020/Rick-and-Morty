import { useEffect, useState} from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
import { useRef } from 'react';
import { FaSearchLocation } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


function Search({onSearchChange, currentValue}: {onSearchChange: (val: string) => void; currentValue: string}) {

  const container = useRef(null)

  useGSAP(() =>{
    gsap.from(".search-element", {
      y: 50,
    scaleX: 0.5,
    scaleY: 0.2,
    opacity: 0,
    delay: 0.7, 
    duration: 1,
    ease: "elastic.out(1, 0.5)"
    })
  }, {scope:container})//tells Gsap to only look in the scope of the container

    const [searchItem, setSearchItem] = useState(currentValue);
    const [text, setText] = useState("")
    //debounce value to trigger API fetch

    useEffect(() => {
    setText(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const handler = setTimeout(() => {

      if (text !== currentValue) {
        onSearchChange(text);
        // console.log("Search dispatched:", text);
      }
    }, 500);
      // Only trigger if the value is actually different to avoid loops
      
    return () => clearTimeout(handler);
   
  }, [text, onSearchChange, currentValue]);
   

   
  return (
    <div className="py-4 mb-2 px-3  filter-[url(#ink-bleed)] " ref={container} >
        <div className=" text-white flex items-center justify-center w-full ">
            <div className="bg-black p-2 rounded-lg flex items-center justify-between w-full max-w-xl search-element border-4 border-[#EBFF6E]">
                <input type="text" placeholder="Find a character..." value={text} onChange={(event) =>{setText(event.target.value) 
            

        }} className="outline-none border-none text-white focus-none w-full flex-1 bg-transparent md:text-xl " />
        

        
        {searchItem ? <button onClick={() =>{setText(""); setSearchItem("")}}><IoClose className="text-2xl text-[#EBFF6E]"/></button> : <button className="opacity-70"><FaSearchLocation  className="text-2xl text-[#EBFF6E]"/></button>}

            </div>
            
        
        </div>
        
            
            
            
      
    </div>
  )
}

export default Search
