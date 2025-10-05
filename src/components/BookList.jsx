import BookCard from "./BookCard";

function BookList({ books, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 mb-10 px-2">
      {books.map((book) => (
        <BookCard
          key={`${book.key}-${book.cover_i}`}
          book={book}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default BookList;
