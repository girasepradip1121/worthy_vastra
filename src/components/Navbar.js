import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userToken } from "./Variable";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const userData = userToken();

  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const token = userData?.token;
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-white py-4 border-b-2 border-gray-500">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">
            <Link to="/">WORTHY-VASTRA</Link>
          </h1>
          <span className="text-xs text-[#BB7E5B] uppercase tracking-wider font-[Inter] text-[#BB7E5B]">
            WEAR YOUR WORTH WITH PRIDE
          </span>
        </div>

        <Link to="/login">
          <i className="fa-regular fa-user text-black p-2 text-[20px] md:hidden block"></i>
        </Link>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping text-black p-2 text-[20px]  md:hidden block"></i>
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/shop" className="hover:text-gray-400">
            Oversized T-Shirt
          </Link>
          <Link to="/shop" className="hover:text-gray-400">
            New Arrivals
          </Link>
          <Link to="/custom" className="hover:text-gray-400">
            Customize
          </Link>
        </nav>

        {/* Search Bar for Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex relative w-full max-w-xs"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full placeholder-gray-400 focus:outline-none"
          />
          <svg
            className="absolute top-2.5 left-3 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"></path>
          </svg>
          {userData?.token ? (
            <Link to={"/login"}>
              <i
                className="fa-solid fa-right-from-bracket text-black p-2 text-[20px]"
                onClick={() => {
                  handleLogout();
                }}
              ></i>
            </Link>
          ) : (
            <Link to={"/login"}>
              <i className="fa-regular fa-user text-black p-2 text-[20px]"></i>
            </Link>
          )}
          <Link to={"/cart"}>
            <i className="fa-solid fa-cart-shopping text-black p-2 text-[20px]"></i>
          </Link>
        </form>

        {/* Cart */}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4 px-4 space-y-4">
          {/* Search Bar inside Mobile Menu */}
          <form
            onSubmit={handleSearch}
            className="relative flex w-full max-w-xs"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full placeholder-gray-400 focus:outline-none"
            />
            <svg
              className="absolute top-2.5 left-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"></path>
            </svg>
          </form>
          <Link to="/" onClick={toggleMobileMenu} className="block">
            Home
          </Link>
          <Link to="/shop" onClick={toggleMobileMenu} className="block">
            Oversized T-Shirt
          </Link>
          <Link to="/shop" onClick={toggleMobileMenu} className="block">
            New Arrivals
          </Link>
          <Link to="/custom" onClick={toggleMobileMenu} className="block">
            Customize
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
