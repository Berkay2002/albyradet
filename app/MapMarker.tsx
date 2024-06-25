// app/components/MapMarker.tsx
import React from 'react';
import Image from 'next/image';

interface MapMarkerProps {
  lat: number;
  lng: number;
}

const MapMarker: React.FC<MapMarkerProps> = () => (
  <div style={{ color: 'red', transform: 'translate(-50%, -50%)' }}>
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9C5 11.1 5.84 13.1 7.25 14.53L12 21L16.75 14.53C18.16 13.1 19 11.1 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="#FF0000"
      />
    </svg>
  </div>
);

export default MapMarker;


