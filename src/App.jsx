import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setSearchTerm(query);
    setError("");
    setBooks([]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      if (data.docs.length === 0) {
        setError("No books found for your search.");
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />

        <div className="mt-6 text-center">
          {loading && <p className="text-blue-600 font-semibold">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && books.length > 0 && (
            <>
              <p className="text-gray-700 mb-4">
                Found <span className="font-semibold">{books.length}</span>{" "}
                books for “<span className="italic">{searchTerm}</span>”
              </p>
              <BookList books={books} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
