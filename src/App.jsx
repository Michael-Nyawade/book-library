import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log("Searching for:", query);
    // Later we’ll fetch data from the API here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto">
        <SearchBar onSearch={handleSearch} />

        {/* Temporary placeholder */}
        {searchTerm && (
          <p className="text-center mt-4 text-gray-700">
            You searched for:{" "}
            <span className="font-semibold">{searchTerm}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
