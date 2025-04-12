'use client';
import MapComponent from "@/components/Map";
import Link from "next/link";

export default function MapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="w-full h-[80vh]">
        <Link href="/ShoppingCartPage">
        <button>Shopping Cart</button></Link>
        <h1 className="text-2xl font-bold mb-4">Location Map</h1>
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <MapComponent />
        </div>
      </div>
    </main>
  );
} 