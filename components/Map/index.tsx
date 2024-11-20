declare global {
  interface Window {
    mapkit: any;
  }
}

import { GeoPoint } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useRef } from "react";

interface MapProps {
  address: string;
  coordinates: GeoPoint;
}

const Map = ({ address, coordinates }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const mapkit = window.mapkit;

    mapkit.init({
      authorizationCallback: (done) => {
        done(process.env.MAPKIT_TOKEN);
      },
    });

    const map = new mapkit.Map(mapRef.current, {
      showsZoomControl: true,
      center: new mapkit.Coordinate(
        coordinates.latitude,
        coordinates.longitude
      ),
      zoom: 12,
    });

    // Add marker
    new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(coordinates.latitude, coordinates.longitude),
      { title: address }
    ).map = map;

    // Add click handler to open Apple Maps
    map.element.addEventListener("click", () => {
      window.open(
        `http://maps.apple.com/?q=${encodeURIComponent(address)}&ll=${
          coordinates.latitude
        },${coordinates.longitude}`,
        "_blank"
      );
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, address]);

  return (
    <>
      <Head>
        <script src="https://cdn.apple-mapkit.com/mk/5.45.0/mapkit.js"></script>
      </Head>
      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          height: "200px",
          cursor: "pointer",
        }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </div>
    </>
  );
};

export default Map;
