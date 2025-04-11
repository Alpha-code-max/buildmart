"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const product = {
      name: data.name,
      quality: data.quality,
      amount: parseFloat(data.amount),
      size: data.size
    };

    try {
      await axios.post("/api/products", product);
      setMessage("✅ Product added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product.");
    }

    redirect('/CatalogPage')
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="block mb-1">Quality</label>
          <input
            {...register("quality", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.quality && <p className="text-red-500 text-sm">Quality is required</p>}
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.amount && <p className="text-red-500 text-sm">Amount is required</p>}
        </div>

        <div>
          <label className="block mb-1">Size</label>
          <input
            {...register("size", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.size && <p className="text-red-500 text-sm">Size is required</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
}
