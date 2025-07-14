import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    profession: "",
    address: "",
    houseNo: "",
    buildingNumber: "",
    pinCode: "",
    landmark: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      // Save additional details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        profession: formData.profession,
        address: formData.address,
        houseNo: formData.houseNo,
        buildingNumber: formData.buildingNumber,
        pinCode: formData.pinCode,
        landmark: formData.landmark,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-2xl border border-white/20 hover:shadow-2xl transition-all duration-300"
      >
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
            Laundry Service
          </h1>
          <p className="text-gray-600 text-lg">
            Create your account and experience premium laundry service
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
            <p>{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Full Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="John Doe"
            />
          </div>
          {/* Email */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="john.doe@example.com"
            />
          </div>
          {/* Password */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
          </div>
          {/* Mobile */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Mobile No.
            </label>
            <input
              name="mobile"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+91 9876543210"
            />
          </div>
          {/* Profession */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Profession
            </label>
            <input
              name="profession"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Software Engineer"
            />
          </div>
          {/* Address */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Address
            </label>
            <input
              name="address"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="123 Main Street"
            />
          </div>
          {/* House No. */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              House No.
            </label>
            <input
              name="houseNo"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="A-123"
            />
          </div>
          {/* Building Number */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Building Number
            </label>
            <input
              name="buildingNumber"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="B-456"
            />
          </div>
          {/* Pin Code */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Pin Code
            </label>
            <input
              name="pinCode"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="400001"
            />
          </div>
          {/* Landmark */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
              Landmark
            </label>
            <input
              name="landmark"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Near Central Park"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
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
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-purple-600 transition-colors duration-200 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
