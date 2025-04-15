'use client'
import { exportedFormData } from "./BuyerForm";
import useCart from "@/store/useCart";
import { useEffect, useState } from "react";

export default function Payment() {
    const { items, totalPrice } = useCart();
    const [isHydrated, setIsHydrated] = useState(false);
    const formData = exportedFormData(items);
    
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Loading cart...</div>;
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.cart.map((item, index) => {
                    const itemTotal = item.amount * item.quantity;
                    const deliveryFee = itemTotal * 0.2; // 20% delivery fee
                    const totalWithDelivery = itemTotal + deliveryFee;
                    
                    return (
                        <div key={item._id} className="p-4 shadow-md rounded-lg border border-gray-200 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <p className="text-blue-600 text-lg font-semibold col-span-2">Item {index + 1}</p>
                                <p className="text-gray-800">Item:</p>
                                <p className="text-gray-800">{item.name}</p>
                                <p className="text-gray-800">Amount:</p>
                                <p className="text-gray-800">&#8358;{item.amount.toLocaleString()}</p>
                                <p className="text-gray-800">Quantity:</p>
                                <p className="text-gray-800">{item.quantity}</p>
                                <p className="text-gray-800">Delivery Fee:</p>
                                <p className="text-gray-800">&#8358;{deliveryFee.toLocaleString()}</p>
                                <p className="text-gray-800">Total:</p>
                                <p className="text-gray-800">&#8358;{totalWithDelivery.toLocaleString()}</p>
                                
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 text-right">
                <p className="text-gray-900 text-xl font-bold">
                    Grand Total: &#8358;{formData.cart.reduce((acc, item) => {
                        const itemTotal = item.amount * item.quantity;
                        const deliveryFee = itemTotal * 0.2; // 20% delivery fee
                        return acc + itemTotal + deliveryFee;
                    }, 0).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
