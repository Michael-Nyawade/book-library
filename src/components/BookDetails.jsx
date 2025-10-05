import { useEffect, useState } from "react";

function BookDetails({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!book) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error(err);
        setError("Could not load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book]);

  if (!book) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-blue-600 font-medium">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-3">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>

            {details?.description && (
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {typeof details.description === "string"
                  ? details.description
                  : details.description.value}
              </p>
            )}

            <ul className="text-sm text-gray-700 space-y-1">
              {book.first_publish_year && (
                <li>
                  <strong>First Published:</strong> {book.first_publish_year}
                </li>
              )}
              {details?.subjects && (
                <li>
                  <strong>Subjects:</strong>{" "}
                  {details.subjects.slice(0, 5).join(", ")}
                </li>
              )}
              {details?.number_of_pages && (
                <li>
                  <strong>Pages:</strong> {details.number_of_pages}
                </li>
              )}
              {details?.isbn_10 && (
                <li>
                  <strong>ISBN:</strong> {details.isbn_10.join(", ")}
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
