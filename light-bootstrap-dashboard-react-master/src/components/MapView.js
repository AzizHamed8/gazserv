import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ address }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  
  // Replace YOUR_API_KEY with your actual OpenCage API key
  const apiKey = 'eef0004133e144cc801766d8189f66af'; 
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setPosition([lat, lng]);
      } else {
        setError('No results found for the address');
      }
    } catch (error) {
      setError('Error fetching coordinates');
    }
  };

  useEffect(() => {
    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  return (
    <div style={{ height: '200px', width: '100%' }}>
      {error && <p>{error}</p>}
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        !error && <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapView;
