'use client';

import { useState, useEffect } from "react";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import useCart from "@/store/useCart";

export default function ProductCard({ product, onAddToCart, onRemoveFromCart }) {
    const { isInCart, items, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(0);

    // Debug product data
    useEffect(() => {
        console.log('Product Data:', product);
        console.log('Cart Items:', items);
    }, [product, items]);

    // Initialize quantity from cart if item exists
    useEffect(() => {
        const cartItem = items.find(item => item._id === product._id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
        } else {
            setQuantity(0);
        }
    }, [items, product._id]);

    const handleAddQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(product._id, newQuantity);
    };

    const handleSubtractQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(product._id, newQuantity);
        } else {
            // If quantity is 1 and we subtract, remove from cart
            onRemoveFromCart();
            setQuantity(0);
        }
    };

    const handleCartAction = () => {
        console.log('Cart Action - Product:', product);
        console.log('Is in cart:', isInCart(product._id));
        
        if (isInCart(product._id)) {
            onRemoveFromCart();
            setQuantity(0);
        } else {
            onAddToCart();
            setQuantity(1);
        }
    };

    return (
        <div className="rounded-lg shadow-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300">
            <img
                src="https://via.placeholder.com/300x200"
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-2">
                <h2 className="font-semibold text-xl text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm">
                    <span className="font-medium">Quality:</span> {product.quality}
                </p>
                <p className="text-gray-600 text-sm">
                    <span className="font-medium">Size:</span> {product.size}
                </p>
                <p className="font-semibold text-lg text-blue-600">
                    ₦{product.amount.toLocaleString()}
                </p>

                <button
                    onClick={handleCartAction}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                        isInCart(product._id)
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isInCart(product._id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>

                {isInCart(product._id) && (
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-700">Quantity: {quantity}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddQuantity}
                                className="text-blue-500 hover:text-blue-600 transition-colors"
                                title="Increase quantity"
                            >
                                <MdAddCircle size={24} />
                            </button>
                            <button
                                onClick={handleSubtractQuantity}
                                className="text-red-500 hover:text-red-600 transition-colors"
                                title="Decrease quantity"
                            >
                                <MdRemoveCircle size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
