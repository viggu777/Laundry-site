// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        Laundry Service
      </div>
      <div className="space-x-4">
        <Link className="text-white hover:underline" to="/">Home</Link>
        <Link className="text-white hover:underline" to="/about">About</Link>
        <Link className="text-white hover:underline" to="/contact">Contact</Link>
        <Link className="text-white hover:underline" to="/laundry-booking-form">Book</Link>
        {currentUser ? (
          <>
            <span className="text-white font-bold">
              {currentUser.email.charAt(0).toUpperCase()}
            </span>
            <button onClick={handleLogout} className="text-white hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="text-white hover:underline" to="/login">Login</Link>
            <Link className="text-white hover:underline" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
