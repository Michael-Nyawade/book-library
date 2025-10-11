import { useEffect, useState } from "react";

function CategoryPreview({ genre, onGenreClick }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(genre)}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.docs.slice(0, 4)))
      .catch((err) => console.error("Category preview fetch error:", err));
  }, [genre]);

  return (
    <div className="text-left">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {genre}
        </h3>
        <button
          onClick={() => onGenreClick(genre)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All →
        </button>
      </div>

      {/* Preview Books */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {books.map((book, i) => {
          const coverId = book.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/150x220?text=No+Cover";

          return (
            <div
              key={i}
              onClick={() => onGenreClick(book.title)}
              className="cursor-pointer group"
            >
              <img
                src={coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300"
              />
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {book.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPreview;
