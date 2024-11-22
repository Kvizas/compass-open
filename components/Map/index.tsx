declare global {
  interface Window {
    mapkit: any;
  }
}

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";

interface MapProps {
  address: string;
  coordinates: { _latitude: number; _longitude: number };
}

const Map = ({ address, coordinates }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !scriptLoaded) return;

    // Add error handling for mapkit initialization
    if (!window.mapkit) {
      console.error("MapKit JS not loaded");
      return;
    }

    const mapkit = window.mapkit;

    try {
      mapkit.init({
        authorizationCallback: (done) => {
          done(process.env.NEXT_PUBLIC_MAPKIT_TOKEN);
        },
      });

      const map = new mapkit.Map(mapRef.current, {
        showsZoomControl: true,
        center: new mapkit.Coordinate(
          coordinates._latitude,
          coordinates._longitude
        ),
        cameraDistance: 1500,
        showsMapTypeControl: true,
        isScrollEnabled: false,
        isZoomEnabled: false,
        colorScheme: "dark",
      });

      // Fix marker addition
      const marker = new mapkit.MarkerAnnotation(
        new mapkit.Coordinate(coordinates._latitude, coordinates._longitude),
        { title: address || "Location" }
      );
      map.addAnnotation(marker);

      // Update click handler with device-specific logic
      map.element.addEventListener("click", () => {
        const latitude = coordinates._latitude;
        const longitude = coordinates._longitude;
        const encodedAddress = encodeURIComponent(address);

        if (isIOS) {
          // Open Apple Maps on iOS devices
          window.open(
            `http://maps.apple.com/?q=${encodedAddress}&ll=${latitude},${longitude}`,
            "_blank"
          );
        } else if (isMobile) {
          // Open Google Maps app on Android devices
          window.open(
            `google.navigation:q=${encodedAddress}@${latitude},${longitude}`,
            "_blank"
          );
        } else {
          // Open Google Maps in browser for desktop
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&query_place_id=${latitude},${longitude}`,
            "_blank"
          );
        }
      });

      mapInstanceRef.current = map;
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, address, scriptLoaded]);

  return (
    <>
      <Script
        src="https://cdn.apple-mapkit.com/mk/5.45.0/mapkit.js"
        onLoad={() => {
          console.log("MapKit JS loaded");
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("Error loading MapKit JS:", e);
        }}
        strategy="afterInteractive"
      />
      <div
        style={{
          borderRadius: 24,
          outline: "#324256 solid 1px",
          overflow: "hidden",
          height: "200px",
          cursor: "pointer",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </div>
    </>
  );
};

export default Map;
