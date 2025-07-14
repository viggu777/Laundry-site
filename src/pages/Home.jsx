/// src/components/Home.js
import React, { useEffect, useState } from "react";
import LaundryBookingForm from "./LaundryBookingForm";

const Home = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "🧺",
      title: "Wash & Fold",
      description:
        "Professional washing and folding service for your everyday laundry needs.",
      delay: "0.1s",
    },
    {
      icon: "👔",
      title: "Dry Cleaning",
      description:
        "High-quality dry cleaning service that ensures your clothes remain pristine.",
      delay: "0.2s",
    },
    {
      icon: "⚡",
      title: "Express Service",
      description:
        "Need your laundry done fast? Our express service is here to help.",
      delay: "0.3s",
    },
  ];

  const testimonials = [
    {
      text: "Fantastic service, my clothes have never looked better!",
      author: "Sarah Johnson",
      rating: 5,
      delay: "0.1s",
    },
    {
      text: "Super fast and affordable. Highly recommend their service.",
      author: "Mike Chen",
      rating: 5,
      delay: "0.2s",
    },
  ];

  return (
    <div className="overflow-hidden">
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
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

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-hidden {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .hero-gradient {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.8),
            rgba(37, 99, 235, 0.9)
          );
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .animate-fadeInLeft,
          .animate-fadeInRight {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .floating-element {
            display: none;
          }

          .hero-content {
            padding: 0 1rem;
          }

          .mobile-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .card-hover:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x900/?laundry')`,
        }}
      >
        <div className="hero-gradient absolute inset-0"></div>
        <div className="relative z-10 text-center text-white hero-content max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fadeInUp leading-tight">
            Welcome to Laundry Service
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 animate-fadeInUp opacity-90 leading-relaxed px-2"
            style={{ animationDelay: "0.2s" }}
          >
            Premium Services at Your Doorstep
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <a
              href="/about"
              className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              About Us →
            </a>
          </div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div
          className="floating-element absolute top-20 left-10 text-white text-6xl animate-float"
          style={{ animationDelay: "0s" }}
        >
          🧺
        </div>
        <div
          className="floating-element absolute top-40 right-20 text-white text-4xl animate-float"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div
          className="floating-element absolute bottom-32 left-20 text-white text-5xl animate-float"
          style={{ animationDelay: "2s" }}
        >
          👕
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="section-why"
        className={`py-12 sm:py-16 md:py-20 px-4 text-center ${
          isVisible["section-why"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
            Why Choose Laundry Service?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 leading-relaxed px-2">
            We provide high-quality, fast, and affordable laundry services with
            eco-friendly solutions. Your satisfaction is our priority.
          </p>

          <div className="grid mobile-grid md:grid-cols-3 gap-6 sm:gap-8">
            <div
              className="animate-fadeInLeft"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-4xl sm:text-5xl mb-4 animate-pulse-slow">
                🌿
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Eco-Friendly
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Using environmentally safe detergents and processes
              </p>
            </div>
            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-4xl sm:text-5xl mb-4 animate-pulse-slow">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Fast Service
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Quick turnaround times without compromising quality
              </p>
            </div>
            <div
              className="animate-fadeInRight"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-4xl sm:text-5xl mb-4 animate-pulse-slow">
                💰
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Affordable
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Competitive pricing for premium laundry services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="section-services"
        className={`py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-white px-4 text-center ${
          isVisible["section-services"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-gray-800">
            Our Services
          </h2>
          <div className="grid mobile-grid md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-6 sm:p-8 rounded-lg shadow-lg card-hover animate-fadeInUp`}
                style={{ animationDelay: service.delay }}
              >
                <div
                  className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-float"
                  style={{ animationDelay: `${index}s` }}
                >
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                  {service.description}
                </p>
                <div className="mt-4 sm:mt-6">
                  <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="section-testimonials"
        className={`py-12 sm:py-16 md:py-20 px-4 text-center bg-gray-50 ${
          isVisible["section-testimonials"]
            ? "section-visible"
            : "section-hidden"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid mobile-grid md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-6 sm:p-8 rounded-lg shadow-lg card-hover animate-fadeInUp`}
                style={{ animationDelay: testimonial.delay }}
              >
                <div className="text-yellow-400 text-xl sm:text-2xl mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-600 italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-gray-800 text-sm sm:text-base">
                  - {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 animate-fadeInUp">
            Ready to Get Started?
          </h2>
          <p
            className="text-lg sm:text-xl mb-6 sm:mb-8 animate-fadeInUp opacity-90 leading-relaxed px-2"
            style={{ animationDelay: "0.2s" }}
          >
            Book your laundry service today and experience the difference
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <a
              href="/laundry-booking-form"
              className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
