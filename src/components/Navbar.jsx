function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
        📚 BookFinder
      </h1>

      <div className="hidden sm:flex space-x-6 text-gray-600 font-medium">
        <a href="#" className="hover:text-blue-700 transition">
          Home
        </a>
        <a href="#" className="hover:text-blue-700 transition">
          About
        </a>
        <a href="#" className="hover:text-blue-700 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
