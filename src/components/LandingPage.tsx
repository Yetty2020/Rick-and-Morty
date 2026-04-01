import { useState } from "react";
import Gallery from "./Gallery"
import Header from "./Header"
import Search from "./Search"
export default function LandingPage() {

     const [searchItem, setSearchItem] = useState("");
  return (
    <div className="p-4 md:p-0">
        <Header/>
        <Search onSearchChange={setSearchItem} />
            <Gallery
                searchTerm={searchItem}
                key={searchItem}
                onSearchUpdate={setSearchItem}
              />
      
    </div>
  )
}
