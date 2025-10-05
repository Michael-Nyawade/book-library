import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
      {books.map((book) => (
        <BookCard key={`${book.key}-${book.cover_i}`} book={book} />
      ))}
    </div>
  );
}

export default BookList;
