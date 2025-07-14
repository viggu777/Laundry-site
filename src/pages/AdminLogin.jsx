// src/components/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Optional: check if user is really an admin (e.g., match email or use Firestore role)
      if (user.email === "admin@laundry.com") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        setError("You are not authorized as admin.");
      }
    } catch (err) {
      setError("Invalid credentials.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20 hover:shadow-xl transition-all duration-300"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Portal
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="admin@laundry.com"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Authenticating...
            </>
          ) : (
            "Login as Admin"
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Secure admin access only</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
