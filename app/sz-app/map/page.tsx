"use client";

import dynamic from "next/dynamic";

// Import dynamique sans SSR
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
  ssr: false,
});

export default function Page() {
  return <MapComponent />;
}
