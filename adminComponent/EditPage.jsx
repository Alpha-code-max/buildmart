'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage ({name, quality, amount, size, id}) {
    // console.log(name, quality, price)

    const router = useRouter()

    const [newName, setNewName] = useState(name)
    const [newQuality, setNewQuanlity] = useState(quality)
    const [newAmount, setNewAmount] = useState(amount)
    const [newSize, setNewSize] = useState(size)

    async function handleSubmit (e) {

        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({newName, newQuality, newAmount, newSize})
            });

            if(!res.ok) {
                throw new Error("Failed to update topic")
            }

            router.push("/Admin/product")
        } catch (error) {
            
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Update Existing Product</h2>
    
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1">Name</label>
              <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
    
            <div>
              <label className="block mb-1">Quality</label>
              <input
                onChange={(e) => setNewQuanlity(e.target.value)}
                value={newQuality}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
    
            <div>
              <label className="block mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                onChange={(e) => setNewAmount(e.target.value)}
                value={newAmount}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
    
            <div>
              <label className="block mb-1">Size</label>
              <input
                onChange={(e) => setNewSize(e.target.value)}
                value={newSize}
                className="w-full border px-3 py-2 rounded"
              />

            </div>
    
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Product
            </button>
          </form>
    
          {/* {message && <p className="mt-4 font-medium">{message}</p>} */}
        </div>
      );
    
}