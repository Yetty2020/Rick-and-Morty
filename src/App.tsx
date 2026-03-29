import { BrowserRouter, Route, Routes } from "react-router-dom";

import CharacterItem from "./components/CharacterItem";

import LandingPage from "./components/LandingPage";

function App() {
   

  return (
    <div className="bg-[#0F3A40] ">
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
  <filter id="ink-bleed">
    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
  </filter>
</svg>
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
