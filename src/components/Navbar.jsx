// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is admin (you can modify this logic based on your admin detection)
  const isAdmin =
    currentUser?.email?.includes("admin") || currentUser?.role === "admin";

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white font-bold text-xl hover:text-blue-200 transition-colors"
            >
              Laundry Service
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/laundry-booking-form"
              className="text-white hover:text-blue-200 transition-colors duration-200 border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600"
            >
              Book Now
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      isAdmin ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  >
                    {currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white">
                    {currentUser.email}
                    {isAdmin && (
                      <span className="text-yellow-200 text-xs ml-2">
                        (Admin)
                      </span>
                    )}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-200 border border-red-400 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-5">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/admin-login"
                  className="text-yellow-200 hover:text-yellow-100 transition-colors duration-200"
                >
                  Admin
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-green-200 border border-green-400 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 border-t border-blue-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:bg-blue-600 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-white hover:bg-blue-600 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-white hover:bg-blue-600 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/laundry-booking-form"
                className="block px-3 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors duration-200 mx-3 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>

              {currentUser ? (
                <div className="border-t border-blue-600 pt-4">
                  <div className="flex items-center px-3 py-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${
                        isAdmin
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                          : "bg-gradient-to-r from-green-400 to-blue-500"
                      }`}
                    >
                      {currentUser.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {currentUser.email}
                      </p>
                      {isAdmin && (
                        <p className="text-yellow-200 text-xs">Admin</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 mx-3"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-blue-600 pt-4 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:bg-blue-600 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block px-3 py-2 text-yellow-200 hover:bg-blue-600 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors duration-200 mx-3 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
