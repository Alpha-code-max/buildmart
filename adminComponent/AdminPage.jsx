"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      let imageUrl = "https://picsum.photos/300/200"; // Default image

      // If there's a file selected, upload it first
      if (fileInputRef.current?.files[0]) {
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const product = {
        name: data.name,
        quality: data.quality,
        amount: parseFloat(data.amount),
        size: data.size,
        image: imageUrl
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add product');
      }

      setMessage("✅ Product added successfully!");
      reset();
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/CatalogPage');
      }, 1500);
    } catch (err) {
      console.error('Error adding product:', err);
      setMessage(`❌ Error: ${err.message || 'Failed to add product'}`);
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="block mb-1">Quality</label>
          <input
            {...register("quality", { required: true })}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
          {errors.quality && <p className="text-red-500 text-sm">Quality is required</p>}
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("amount", { required: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
          {errors.amount && <p className="text-red-500 text-sm">Amount is required and must be positive</p>}
        </div>

        <div>
          <label className="block mb-1">Size</label>
          <select
            {...register("size", { required: true })}
            className="w-full border px-3 py-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="" disabled>Select size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          {errors.size && <p className="text-red-500 text-sm">Size is required</p>}
        </div>

        <div>
          <label className="block mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
          {previewImage && (
            <div className="mt-2 relative w-full h-48">
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>

      {message && (
        <p className={`mt-4 font-medium ${
          message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}
