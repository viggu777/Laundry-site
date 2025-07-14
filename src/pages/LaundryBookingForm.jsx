import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LaundryBookingForm = () => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Categories and items
  const categories = {
    "Regular Cloths": ["Shirt", "T-shirt", "Jeans", "Trousers"],
    "HouseHold Cloths": ["Bedsheet", "Curtain", "Tablecloth", "Towel"],
    "Luxury Cloths": ["Saree", "Silk Dress", "Leather Jacket", "Woolen Coat"],
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setItem(""); // Reset item when category changes
  };

  // Handle item selection
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  // Add item to the list
  const handleAddItem = () => {
    if (!category || !item || quantity < 1) {
      setError("Please select a category, item, and quantity.");
      return;
    }

    const newItem = { category, item, quantity };
    setSelectedItems([...selectedItems, newItem]);
    setError(null);
    setCategory("");
    setItem("");
    setQuantity(1);
  };

  // Remove item from the list
  const handleRemoveItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setError("Please add at least one item.");
      return;
    }

    try {
      const orderId = Date.now().toString(); // Generate a unique order ID
      await setDoc(doc(db, "orders", orderId), {
        items: selectedItems,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8))",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:shadow-3xl border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Laundry Booking
            </h2>
            <p className="text-gray-600 text-lg">
              Select your items and place your order
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
              <div className="flex">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Category Selection */}
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                Select Category
              </span>
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300 hover:shadow-md text-gray-700"
            >
              <option value="">Choose a category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Item Selection */}
          {category && (
            <div className="mb-6 group animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  Select Item
                </span>
              </label>
              <select
                value={item}
                onChange={handleItemChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300 hover:shadow-md text-gray-700"
              >
                <option value="">Choose an item</option>
                {categories[category].map((itm) => (
                  <option key={itm} value={itm}>
                    {itm}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Input */}
          {item && (
            <div className="mb-6 group animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    ></path>
                  </svg>
                  Quantity
                </span>
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300 hover:shadow-md text-gray-700"
              />
            </div>
          )}

          {/* Add Item Button */}
          {item && quantity > 0 && (
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeIn"
            >
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Item to Cart
              </span>
            </button>
          )}

          {/* Selected Items List */}
          {selectedItems.length > 0 && (
            <div className="mb-6 animate-fadeIn">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  ></path>
                </svg>
                Selected Items ({selectedItems.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedItems.map((selectedItem, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {selectedItem.quantity}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          {selectedItem.item}
                        </span>
                        <p className="text-sm text-gray-600">
                          {selectedItem.category}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Place Order
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaundryBookingForm;
