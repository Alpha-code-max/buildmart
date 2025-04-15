'use client';

import LoadingBar from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useCart from "@/store/useCart";

export default function CatalogPage() {
    const { addItem, removeItem } = useCart();

    const fetchProducts = async () => {
        try {
            console.log('Fetching products...');
            // Use absolute URL for the API endpoint
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
            const response = await fetch(`${baseUrl}/api/products`, {
                headers: {
                    'Accept': 'application/json',
                },
                cache: 'no-store'
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData
                });
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Products fetched successfully:', data.length);
            return data;
        } catch (error) {
            console.error('Error in fetchProducts:', error);
            throw new Error(error.message || 'Failed to fetch products');
        }
    };

    // React Query hook for data fetching with retry logic
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Handle loading state
    if (isLoading) return <div><LoadingBar /></div>;
    
    // Handle error state
    if (error) {
        console.error('Error state:', error);
        return (
            <div className="text-red-500 text-center p-4">
                <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
                <p className="mb-4">{error.message}</p>
                <p className="text-sm text-gray-500">Please check your internet connection and try again.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
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