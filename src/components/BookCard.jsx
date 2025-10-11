function BookCard({ book, onSave }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  const author = book.author_name?.join(", ") || "Unknown Author";
  const year = book.first_publish_year || "N/A";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 dark:text-gray-100">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
          {author}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
          📅 {year}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(book);
          }}
          className="mt-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-md"
        >
          ➕ Add to Reading List
        </button>
      </div>
    </div>
  );
}

export default BookCard;
