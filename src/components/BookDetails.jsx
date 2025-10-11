function BookDetails({ book, onBack }) {
  const coverId = book.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/300x450?text=No+Cover";

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  const subjects = book.subjects?.slice(0, 8) || [];

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 transition-all duration-300">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Results
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-56 h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3 dark:text-gray-100">
            {book.title}
          </h2>

          {book.subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {book.subtitle}
            </p>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            First published:{" "}
            {book.first_publish_date ||
              book.created?.value?.slice(0, 10) ||
              "N/A"}
          </p>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Subjects */}
          {subjects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Reading List */}
          <button
            onClick={() => alert("Feature: Save to Reading List")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition-all duration-200 shadow-md text-sm font-medium"
          >
            ➕ Add to Reading List
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
