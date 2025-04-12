'use client';

import LoadingBar from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import useCart from "@/store/useCart";

export default function CatalogPage() {
    const { addItem, removeItem } = useCart();

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/products');
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
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
    if (error) return <div className="text-red-500 text-center p-4">An error occurred while loading products</div>;

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