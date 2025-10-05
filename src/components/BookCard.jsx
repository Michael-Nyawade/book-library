function BookCard({ book, onSelect }) {
  const coverId = book.cover_i;
  const coverImage = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      className="bg-white shadow rounded-lg p-4 flex flex-col items-center hover:shadow-md transition cursor-pointer"
      onClick={() => onSelect(book)}
    >
      <img
        src={coverImage}
        alt={book.title}
        className="w-32 h-48 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-gray-800 text-center mb-1">
        {book.title}
      </h3>
      <p className="text-gray-500 text-sm text-center">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-gray-400 text-xs mt-1">
        {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}

export default BookCard;
