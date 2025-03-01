// src/components/Home.js
import React from 'react';
import LaundryBookingForm from './LaundryBookingForm';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?laundry')` }}>
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">Welcome to Our Laundry Service</h1>
        </div>
      </section>
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?laundry')` }}>
       <LaundryBookingForm />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          We provide high-quality, fast, and affordable laundry services with eco-friendly solutions.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-4">Wash & Fold</h3>
            <p>Professional washing and folding service for your everyday laundry needs.</p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-4">Dry Cleaning</h3>
            <p>High-quality dry cleaning service that ensures your clothes remain pristine.</p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-4">Express Service</h3>
            <p>Need your laundry done fast? Our express service is here to help.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        <div className="max-w-4xl mx-auto">
          <p className="italic mb-4">"Fantastic service, my clothes have never looked better!"</p>
          <p className="italic">"Super fast and affordable. Highly recommend their service."</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
