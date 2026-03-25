import { BrowserRouter, Route, Routes } from "react-router-dom";

import CharacterItem from "./components/CharacterItem";

import LandingPage from "./components/LandingPage";

function App() {
   

  return (
    <div className="bg-[#0F3A40]">
      <BrowserRouter>
        
        <Routes>
          <Route
            path="/"
            element={<>
           <LandingPage />
            
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
