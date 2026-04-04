import { useState } from "react";
import Gallery from "./Gallery"
import Header from "./Header"
import Search from "./Search"
import { useSearchParams, useNavigate } from "react-router-dom";
export default function LandingPage() {

     const [searchItem, setSearchItem] = useState("");

     const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const currentSearch = searchParams.get("search") || "";

  const handleSearchChange = (newValue: string) => {
    if (newValue) {
      // This changes the URL to /?search=name
      setSearchParams({ search: newValue }, { replace: true });
    } else {
      // This clears the URL to /
      setSearchParams({});
    }
  };

  const resetToHome = () => {
    setSearchParams({}); // Clears the search param
    navigate("/");       // Forces a re-load of the base route
  };
  return (
    <div className="p-4 md:p-0 bg-[#0F3A40] min-h-screen ">
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
