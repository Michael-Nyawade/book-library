function BookCard({ book, onSelect }) {
  const coverId = book.cover_i;
  const coverImage = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(book)}
    >
      <img
        src={coverImage}
        alt={book.title}
        className="w-32 h-48 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-gray-800 text-center text-sm sm:text-base mb-1">
        {book.title.length > 50 ? book.title.slice(0, 50) + "..." : book.title}
      </h3>
      <p className="text-gray-500 text-xs sm:text-sm text-center">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-gray-400 text-xs mt-1">
        {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}

export default BookCard;
