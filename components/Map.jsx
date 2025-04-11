'use client';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

// This component handles map center updates
function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function MapComponent() {
  const [center, setCenter] = useState(defaultCenter);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        setCenter({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      <div className="h-[calc(100%-60px)]">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[center.lat, center.lng]} />
          <ChangeMapView center={[center.lat, center.lng]} />
        </MapContainer>
      </div>
    </div>
  );
}
