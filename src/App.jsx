import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";
import CategoryPreview from "./components/CategoryPreview";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const genres = [
    "Fiction",
    "Science",
    "History",
    "Fantasy",
    "Romance",
    "Mystery",
    "Biography",
    "Children",
    "Poetry",
    "Horror",
  ];

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=fiction"
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 12));
    } catch (err) {
      console.error("Featured fetch error:", err);
      setError("Unable to load featured books.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setError("");
    setBooks([]);
    setSelectedBook(null);
    setLoading(true);
    setCurrentView("home");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found. Try a different search.");
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (book) => {
    setError("");
    setSelectedBook(null);
    setLoading(true);

    const olid = book.key?.split("/").pop();
    if (!olid) return;

    try {
      const response = await fetch(
        `https://openlibrary.org/works/${olid}.json`
      );
      const data = await response.json();
      setSelectedBook(data);
    } catch (err) {
      console.error("Details fetch error:", err);
      setError("Unable to load book details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToReadingList = (book) => {
    const alreadySaved = readingList.some((b) => b.key === book.key);
    if (!alreadySaved) {
      setReadingList([...readingList, book]);
    }
  };

  const handleRemoveFromReadingList = (key) => {
    setReadingList(readingList.filter((book) => book.key !== key));
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Sidebar */}
        <aside
          className={`fixed z-20 top-0 left-0 h-full w-64 bg-blue-700 dark:bg-blue-900 text-white flex flex-col justify-between p-6 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div>
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
              📚 Book Library
            </h1>

            <nav className="space-y-4 mb-8">
              {["home", "categories", "about"].map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    setCurrentView(view);
                    setSidebarOpen(false);
                  }}
                  className={`block w-full text-left capitalize hover:underline ${
                    currentView === view ? "font-semibold" : ""
                  }`}
                >
                  {view}
                </button>
              ))}
            </nav>

            <div>
              <h2 className="text-lg font-semibold mb-2">📖 Reading List</h2>
              <ul className="space-y-2 text-sm">
                {readingList.length === 0 ? (
                  <li className="text-gray-300">No books saved yet.</li>
                ) : (
                  readingList.map((book) => (
                    <li
                      key={book.key}
                      className="flex justify-between items-center text-white"
                    >
                      <span>{book.title}</span>
                      <button
                        onClick={() => handleRemoveFromReadingList(book.key)}
                        className="text-red-300 hover:text-red-500 ml-2"
                        title="Remove"
                      >
                        ❌
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <p className="text-xs text-center text-gray-300 mt-6">
            © {new Date().getFullYear()} Book Library
          </p>
        </aside>

        {/* Overlay (for mobile sidebar) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-64 px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300">
          {/* Floating top bar */}
          <div className="flex items-center justify-between mb-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition"
            >
              ☰
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center transition-all duration-300 shadow-inner"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </div>
            </button>
          </div>

          {/* Views */}
          {currentView === "home" && (
            <>
              {/* Search Panel */}
              <section className="bg-white dark:bg-gray-800 shadow-md p-6 max-w-4xl mx-auto mt-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Find Your Next Read
                </h2>
                <SearchBar onSearch={handleSearch} />
                {error && (
                  <p className="text-center text-red-500 mb-4">{error}</p>
                )}
                {loading && (
                  <p className="text-center text-blue-600 mb-4">Loading...</p>
                )}
              </section>

              {/* Genre Tags */}
              <section className="max-w-6xl mx-auto mt-8 mb-6">
                <h3 className="text-lg font-semibold mb-2">Browse by Genre</h3>
                <div className="flex overflow-x-auto gap-3 pb-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleSearch(genre)}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 whitespace-nowrap transition"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </section>

              {/* Book Display */}
              <section className="py-8">
                {selectedBook ? (
                  <BookDetails
                    book={selectedBook}
                    onBack={() => setSelectedBook(null)}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {books.map((book, index) => (
                      <div
                        key={index}
                        onClick={() => handleBookClick(book)}
                        className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                      >
                        <BookCard
                          book={book}
                          onSave={handleSaveToReadingList}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {currentView === "categories" && (
            <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
              {/* Title */}
              <h2 className="text-3xl font-bold mb-4">📚 Explore Categories</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Browse by genre or search to find your next great read.
              </p>

              {/* Search bar */}
              <div className="max-w-md mx-auto mb-10">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {genres.map((genre, index) => {
                  const icons = [
                    "📖",
                    "🔬",
                    "🏰",
                    "💞",
                    "🕵️‍♂️",
                    "👻",
                    "🧠",
                    "🧒",
                    "🧙‍♂️",
                    "🪶",
                  ];
                  const icon = icons[index % icons.length];

                  return (
                    <button
                      key={genre}
                      onClick={() => handleSearch(genre)}
                      className="flex flex-col items-center justify-center h-32 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-3xl mb-2">{icon}</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {genre}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Featured Categories Preview */}
              <div className="space-y-12">
                {genres.slice(0, 4).map((genre, index) => (
                  <CategoryPreview
                    key={index}
                    genre={genre}
                    onGenreClick={handleSearch}
                  />
                ))}
              </div>
            </div>
          )}

          {currentView === "about" && (
            <div className="max-w-4xl mx-auto mt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">ℹ️ About This App</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This Book Library app was built using React, Tailwind CSS, and
                the Open Library API. It lets users search for books, view
                details, and save favorites to a reading list.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
