"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  return (
    <div className="absolute inset-0 -z-10 ">
      <MapContainer
        center={[42.79517557942795, -0.10859408563259056]}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* <CustomZoom /> */}
      </MapContainer>
    </div>
  );
}

// function CustomZoom() {
//   const map = useMap();

//   return (
//     <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2 pointer-events-auto">
//       <button
//         onClick={() => map.zoomIn()}
//         className="bg-black/80 text-white w-12 h-12 rounded-xl shadow-lg hover:bg-black"
//       >
//         +
//       </button>
//       <button
//         onClick={() => map.zoomOut()}
//         className="bg-black/80 text-white w-12 h-12 rounded-xl shadow-lg hover:bg-black"
//       >
//         −
//       </button>
//     </div>
//   );
// }
