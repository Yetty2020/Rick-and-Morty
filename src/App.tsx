
import { useState } from "react"
import Gallery from "./components/Gallery"
import Search from "./components/Search"



function App() {
  const [searchItem, setSearchItem] = useState("")
  return (
    <div className="">
      <Search onSearchChange={setSearchItem}/>
    <Gallery searchTerm={searchItem} key={searchItem} onSearchUpdate={setSearchItem}/>
      
    </div>
  )
}

export default App
