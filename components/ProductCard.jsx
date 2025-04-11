'use client';

import { useState } from "react";
import Link from "next/link";
import {MdAddCircle, MdRemoveCircle} from "react-icons/md"

export default function ProductCard({product}) {
  const [quantity, setQuantity] = useState(0);
  const [text, setText] = useState('Add to Cart');

  function handleAddQuantity() {
    setQuantity(quantity + 1);
  }

  function handleSubtractQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="rounded-lg shadow bg-white p-4 w-72 mt-5">
      <img
        src="https://via.placeholder.com/300x200"
        alt="Product Image"
        className="w-full h-40 object-cover rounded"
      />

      <div className="mt-4">
        <h2 className="font-semibold text-xl">{product.name}</h2>
        <p className="text-gray-600 text-sm"><i>Quality: </i>{product.quality}</p>
        <p className="text-gray-600 text-sm"><i>Size: </i>{product.size}</p>
        <h2 className="font-semibold my-2 text-sm">&#8358;{product.amount}</h2>

        <button
          onClick={() => setText(text === 'Add to Cart' ? 'Remove' : 'Add to Cart')}
          className={`${text === 'Add to Cart' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} cursor-pointer px-4 py-2 rounded-sm text-white `}
        >
          {text}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-gray-700">Quantity: {quantity}</span>
        {text === 'Add to Cart' && (<div>
          <button
            onClick={handleAddQuantity}
            className="font-extrabold cursor-pointer text-gray-700"
            >
            <MdAddCircle size={24}/>
          </button>
          <button
            onClick={handleSubtractQuantity}
            className="font-extrabold cursor-pointer text-gray-700"
          size={48}
          >
            <MdRemoveCircle size={24}/>
          </button>
        </div>)}
      </div>
    </div>
  );
}
