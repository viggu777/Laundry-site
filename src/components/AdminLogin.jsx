// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const navigate              = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError(null);
    // Hardcoded admin credentials
    if(email === "admin@laundry.com" && password === "admin123") {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Admin Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full p-2 border rounded" 
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full p-2 border rounded" 
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
