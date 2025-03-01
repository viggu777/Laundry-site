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
    <div className="bg-slate-900">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all hover:scale-105"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Laundry Booking
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Item Selection */}
          {category && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Item
              </label>
              <select
                value={item}
                onChange={handleItemChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select an item</option>
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          )}

          {/* Add Item Button */}
          {item && quantity > 0 && (
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all mb-6"
            >
              Add Item
            </button>
          )}

          {/* Selected Items List */}
          {selectedItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Selected Items</h3>
              <ul className="space-y-4">
                {selectedItems.map((selectedItem, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                  >
                    <span>
                      {selectedItem.item} ({selectedItem.quantity}) -{" "}
                      {selectedItem.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaundryBookingForm;
