'use client';

import { MdAddCircle, MdRemoveCircle, MdDelete } from "react-icons/md";
import useCart from "@/store/useCart";

export default function CartPage() {
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
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.quality}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">₦{item.amount.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
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
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        ₦{(item.amount * item.quantity).toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                                        title="Remove item"
                                    >
                                        <MdDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="bg-gray-50 px-6 py-4">
                    <div className="space-y-2">
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
            </div>
        </div>
    );
} 