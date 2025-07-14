// src/components/Contact.js
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
        }

        .contact-info-item {
          transition: all 0.3s ease;
        }

        .contact-info-item:hover {
          transform: translateX(10px);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-slideInLeft,
          .animate-slideInRight {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .card-hover:hover {
            transform: none;
          }

          .contact-info-item:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fadeInUp">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              We're here to help with all your laundry needs. Contact us today
              for premium service!
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-10 left-10 text-white text-4xl sm:text-5xl animate-float hidden sm:block"
          style={{ animationDelay: "0s" }}
        >
          📧
        </div>
        <div
          className="absolute top-20 right-10 text-white text-3xl sm:text-4xl animate-float hidden sm:block"
          style={{ animationDelay: "1s" }}
        >
          📞
        </div>
        <div
          className="absolute bottom-10 left-20 text-white text-4xl sm:text-5xl animate-float hidden sm:block"
          style={{ animationDelay: "2s" }}
        >
          🏠
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div
              className="animate-slideInLeft"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 card-hover">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
                  Contact Information
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  <div className="contact-info-item flex items-center space-x-4 sm:space-x-6">
                    <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
                      <span className="text-xl sm:text-2xl text-blue-600">
                        📧
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                        Email
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        support@cleancare.com
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        info@cleancare.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-center space-x-4 sm:space-x-6">
                    <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                      <span className="text-xl sm:text-2xl text-green-600">
                        📞
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                        Phone
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-center space-x-4 sm:space-x-6">
                    <div className="bg-purple-100 p-3 sm:p-4 rounded-full">
                      <span className="text-xl sm:text-2xl text-purple-600">
                        🏠
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                        Address
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        123 CleanCare Street
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Laundry District, City 12345
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-center space-x-4 sm:space-x-6">
                    <div className="bg-orange-100 p-3 sm:p-4 rounded-full">
                      <span className="text-xl sm:text-2xl text-orange-600">
                        ⏰
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                        Hours
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Mon - Fri: 7:00 AM - 8:00 PM
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Sat - Sun: 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <div className="bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <span className="text-lg">📘</span>
                    </div>
                    <div className="bg-pink-600 text-white p-3 rounded-full cursor-pointer hover:bg-pink-700 transition-colors">
                      <span className="text-lg">📷</span>
                    </div>
                    <div className="bg-blue-400 text-white p-3 rounded-full cursor-pointer hover:bg-blue-500 transition-colors">
                      <span className="text-lg">🐦</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="animate-slideInRight"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 card-hover">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 btn-hover"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 animate-fadeInUp">
              Find Us
            </h2>
            <p
              className="text-gray-600 text-base sm:text-lg animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Visit our location or use our pickup and delivery service
            </p>
          </div>

          <div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 card-hover animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-gray-200 rounded-lg h-64 sm:h-80 md:h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-4xl sm:text-5xl mb-4">🗺️</div>
                <p className="text-sm sm:text-base">
                  Interactive map would be integrated here
                </p>
                <p className="text-xs sm:text-sm mt-2 opacity-75">
                  123 CleanCare Street, Laundry District, City 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience Premium Laundry Service?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
              Book your first service today and get 20% off!
            </p>
            <a
              href="/laundry-booking-form"
              className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 btn-hover"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
