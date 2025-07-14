// src/components/About.js
import React, { useEffect, useState } from "react";

const About = () => {
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

    document.querySelectorAll('[id^="about-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "🌿",
      title: "Eco-Friendly",
      description:
        "We use biodegradable detergents and energy-efficient processes to minimize environmental impact.",
    },
    {
      icon: "⚡",
      title: "Fast Service",
      description:
        "Quick turnaround times with same-day and next-day delivery options available.",
    },
    {
      icon: "🔧",
      title: "Modern Equipment",
      description:
        "State-of-the-art washing machines and dryers for superior cleaning results.",
    },
    {
      icon: "👥",
      title: "Expert Team",
      description:
        "Professional staff trained in fabric care and stain removal techniques.",
    },
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Service Hours" },
    { number: "10+", label: "Years Experience" },
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

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
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
            rgba(59, 130, 246, 0.9),
            rgba(37, 99, 235, 0.8)
          );
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x600/?laundry,cleaning')`,
        }}
      >
        <div className="hero-gradient absolute inset-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            About Laundry Service
          </h1>
          <p
            className="text-lg md:text-xl opacity-90 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Your trusted partner in premium laundry services
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section
        id="about-story"
        className={`py-16 px-4 md:py-20 ${
          isVisible["about-story"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Founded with a passion for excellence, CleanCare Laundry has been
            serving the community for over 10 years. We started as a small
            family business with a simple mission: to provide the highest
            quality laundry services while caring for the environment and our
            customers.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Today, we've grown into a trusted name in the industry, combining
            traditional care with modern technology to deliver exceptional
            results. Our commitment to eco-friendly practices and customer
            satisfaction remains at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="about-features"
        className={`py-16 md:py-20 bg-gray-50 px-4 ${
          isVisible["about-features"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-lg text-center card-hover animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="text-5xl mb-4 animate-float"
                  style={{ animationDelay: `${index}s` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="about-stats"
        className={`py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 ${
          isVisible["about-stats"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center animate-countUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="about-mission"
        className={`py-16 md:py-20 px-4 ${
          isVisible["about-mission"] ? "section-visible" : "section-hidden"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To revolutionize the laundry industry by providing exceptional
                service that combines convenience, quality, and environmental
                responsibility. We believe that clean clothes shouldn't come at
                the cost of a clean planet.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">✓</div>
                  <p className="text-gray-600">
                    Commitment to eco-friendly practices
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">✓</div>
                  <p className="text-gray-600">
                    State-of-the-art cleaning technology
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">✓</div>
                  <p className="text-gray-600">Exceptional customer service</p>
                </div>
              </div>
            </div>
            <div className="animate-fadeInRight">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Our Values
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">🌱</span>
                    Environmental Sustainability
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">⭐</span>
                    Quality Excellence
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">💙</span>
                    Customer Satisfaction
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">🤝</span>
                    Community Care
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
            Experience the CleanCare Difference
          </h2>
          <p
            className="text-lg md:text-xl mb-8 opacity-90 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of satisfied customers who trust us with their
            laundry needs
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <a
              href="/laundry-booking-form"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Book Your Service Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
