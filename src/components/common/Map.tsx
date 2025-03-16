'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: markerIcon.src,
      shadowUrl: markerShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.marker([51.5, -0.09], { icon: customIcon })
      .addTo(map)
      .bindPopup('123 Example St, <br> City, State, ZIP')
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div className="z-0 h-full w-full rounded-md" id="map" />;
};

export default Map;
