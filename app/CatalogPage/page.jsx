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
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
            const response = await fetch(`${baseUrl}/api/products`, {
                headers: {
                    'Accept': 'application/json',
                },
                cache: 'no-store'
            });
            
            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
                throw new Error('Invalid response from server');
            }
            
            if (!response.ok) {
                const errorInfo = {
                    status: response.status,
                    statusText: response.statusText,
                    error: data?.error || 'Unknown error',
                    details: data?.details || {}
                };
                console.error('API Error:', errorInfo);
                const error = new Error(data?.message || `HTTP error! status: ${response.status}`);
                error.details = errorInfo;
                throw error;
            }
            
            if (!Array.isArray(data)) {
                console.error('Invalid data format:', data);
                throw new Error('Invalid data format received from server');
            }
            
            console.log('Products fetched successfully:', data.length);
            return data;
        } catch (error) {
            console.error('Error in fetchProducts:', error);
            // Create a new error with the original message
            const newError = new Error(error.message || 'Failed to fetch products');
            // Copy over any existing details or create a new object
            newError.details = error.details || {
                type: 'Network Error',
                message: error.message
            };
            throw newError;
        }
    };

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    if (isLoading) return <div><LoadingBar /></div>;
    
    if (error) {
        console.error('Error state:', error);
        return (
            <div className="text-red-500 text-center p-4">
                <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
                <p className="mb-2">{error.message}</p>
                {error.details && (
                    <div className="text-sm text-gray-600 mb-4">
                        <p>Error Type: {error.details.type || 'Unknown'}</p>
                        {error.details.code && <p>Error Code: {error.details.code}</p>}
                        {error.details.message && <p>Details: {error.details.message}</p>}
                    </div>
                )}
                <p className="text-sm text-gray-500 mb-4">Please check your internet connection and try again.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center p-4">
                <h2 className="text-xl font-bold mb-2">No Products Available</h2>
                <p className="text-gray-600">There are currently no products in the catalog.</p>
            </div>
        );
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