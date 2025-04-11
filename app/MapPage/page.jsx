'use client';
import MapComponent from "@/components/Map";

export default function MapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="w-full h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Location Map</h1>
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <MapComponent />
        </div>
      </div>
    </main>
  );
} 