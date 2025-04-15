'use client';

import LoadingBar from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useCart from "@/store/useCart";

export default function CatalogPage() {
    const { addItem, removeItem } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }
    };

    // React Query hook for data fetching
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // Handle loading state
    if (isLoading) return <div><LoadingBar /></div>;
    
    // Handle error state
    if (error) {
        console.error('Error state:', error);
        return <div className="text-red-500 text-center p-4">An error occurred while loading products</div>;
    }

    // Handle empty state
    if (!products || products.length === 0) {
        return <div className="text-center p-4">No products available</div>;
    }

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
                <ProductCard 
                    key={product._id} 
                    product={product}
                    onAddToCart={() => addItem(product)}
                    onRemoveFromCart={() => removeItem(product._id)}
                />
            ))}
        </main>
    );
}