// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Laundry Service</h3>
          <p>Your trusted partner for a modern, hassle-free laundry experience. We offer eco-friendly and fast solutions.</p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:underline">About</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
            <li className="mb-2">
              <a href="/login" className="hover:underline">Login</a>
            </li>
          </ul>
        </div>
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>123 Laundry Street</p>
          <p>City, Country</p>
          <p>+123456789</p>
          <p>support@laundryservice.com</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Laundry Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
