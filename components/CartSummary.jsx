'use client';

import { MdAddCircle, MdRemoveCircle, MdDelete } from "react-icons/md";
import useCart from "@/store/useCart";

export default function CartSummary() {
    const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
    
    // Calculate delivery fee (20% of subtotal)
    const deliveryFee = totalPrice * 0.2;
    const total = totalPrice + deliveryFee;

    const handleAddQuantity = (item) => {
        updateQuantity(item._id, item.quantity + 1);
    };

    const handleSubtractQuantity = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item._id, item.quantity - 1);
        } else {
            removeItem(item._id);
        }
    };

    const handleRemoveItem = (itemId) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            removeItem(itemId);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-3 mb-4">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">₦{item.amount.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleSubtractQuantity(item)}
                                className="text-red-500 hover:text-red-600 transition-colors p-1"
                                title="Decrease quantity"
                            >
                                <MdRemoveCircle size={18} />
                            </button>
                            <span className="text-gray-700 min-w-[20px] text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleAddQuantity(item)}
                                className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                                title="Increase quantity"
                            >
                                <MdAddCircle size={18} />
                            </button>
                            <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="text-red-500 hover:text-red-600 transition-colors p-1 ml-2"
                                title="Remove item"
                            >
                                <MdDelete size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({totalItems} items):</span>
                    <span className="font-medium">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee (20%):</span>
                    <span className="font-medium">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                    <div className="flex justify-between text-gray-900 font-bold">
                        <span>Total:</span>
                        <span>₦{total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 