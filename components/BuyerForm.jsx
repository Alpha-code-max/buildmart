'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

import useCart from "@/store/useCart";

export default function NameForm() {
  const { items } = useCart();
  
  // Initialize the form data state with default values
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    deliveryAddress: '',
    cart: items
  });

  // Handle input changes and update the form data state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Log form data to console whenever it changes
  useEffect(() => {
    console.log('Current Form Data:', formData);
  }, [formData]);

  // Function to get the form data along with cart items
  const getFormData = () => {
    return {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      deliveryAddress: formData.deliveryAddress,
      cart: items
    };
  };
      
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the form data and log it to the console
    const data = JSON.stringify(getFormData());
    console.log('Form Data on Submit:', data);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-left w-full">
        <h2 className="text-slate-700 text-2xl font-bold mb-2">
          Delivery Information
        </h2>

        <p className="text-slate-500 mb-6">
          Input accurate details for prompt delivery of products
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-slate-700 font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="w-full">
            <label htmlFor="phoneNumber" className="block text-left text-slate-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="w-full">
            <label htmlFor="deliveryAddress" className="block text-left text-slate-700 font-medium mb-2">
              Delivery Address
            </label>
            <textarea
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              placeholder="Enter your delivery address"
              rows="3"
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>
          <button
              type="submit" className="text-left underline underline-offset-2 hover:text-green-600 text-blue-500 font-semibold py-2 rounded-md transition w-full">
              <Link href={'/MapPage'}>Use GPS Location</Link>
            </button>

          <Link href="/OrderDetails">
            <button
              type="submit" className="border-blue-500 border-1 hover:text-white hover:bg-blue-600 text-blue-500 font-semibold px-6 py-2 rounded-md transition w-full">
              Proceed to Payment
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

// Export the form data for use in other components or modules
export const exportedFormData = (items) => ({
  name: '',
  phoneNumber: '',
  deliveryAddress: '',
  cart: items
});
