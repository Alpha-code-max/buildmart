'use client';
import { Suspense } from 'react';
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with no SSR
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function MapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="w-full h-[80vh]">
        <Link href="/CheckoutPage">
          <button className="flex items-center bg-blue-500 mb-5 px-3 py-4 text-white text-sm cursor-pointer rounded-2xl">
            <MdArrowBackIos size={24} />Back to Checkout
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4">Location Map</h1>
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <MapComponent />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 