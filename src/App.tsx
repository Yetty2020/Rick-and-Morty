import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Gallery from "./components/Gallery";
import Search from "./components/Search";
import CharacterItem from "./components/CharacterItem";
import Header from "./components/Header";

function App() {
  const [searchItem, setSearchItem] = useState("");
  return (
    <div className="">
      <BrowserRouter>
        
        <Routes>
          <Route
            path="/"
            element={<>
            <Header/>
            <Search onSearchChange={setSearchItem} />
            <Gallery
                searchTerm={searchItem}
                key={searchItem}
                onSearchUpdate={setSearchItem}
              />
            </>
              
            }
          />
          <Route path="/character/:id" element={<CharacterItem />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
