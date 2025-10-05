import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
    >
      <input
        type="text"
        placeholder="Search for books by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
