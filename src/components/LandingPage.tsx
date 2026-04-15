import { useSearchParams, useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import Header from "./Header";
import Search from "./Search";

export default function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Derive the search term DIRECTLY from the URL.
  // No useState = No race condition.
  const searchItem = searchParams.get("search") || "";

  const handleSearchChange = (newValue: string) => {
    if (newValue) {
      setSearchParams({ search: newValue }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const resetToHome = () => {
    // 2. Simply navigate to the clean root. 
    // React Router will see the URL change and searchItem will automatically become ""
    navigate("/", { replace: true });
  };

  return (
    <div className="p-4 md:px-10 bg-[#0F3A40] min-h-screen comic-dots paper-texture ">
      <div className="border-r-4 border-l-4 border-t-4 border-[black] ">
        <Header />
      {/* 3. Pass searchItem (the URL value) back into the Search bar */}
      <Search onSearchChange={handleSearchChange} currentValue={searchItem} />
      <Gallery
        searchTerm={searchItem}
        key={searchItem} // This still triggers the re-fetch
        onSearchUpdate={handleSearchChange}
        onReset={resetToHome}
      />

      </div>
      
    </div>
  );
}