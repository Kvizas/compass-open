import { GeoPoint } from "firebase/firestore";
import { Map as MapKit, Marker } from "mapkit-react";
import { isIOS } from "react-device-detect";

interface MapProps {
  address: string;
  coordinates: GeoPoint;
}

const Map = ({ address, coordinates }: MapProps) => {
  const handleMapClick = () => {
    if (isIOS) {
      // Open Apple Maps
      window.open(
        `maps://maps.apple.com/?q=${encodeURIComponent(address)}`,
        "_blank"
      );
    } else {
      // Open Google Maps
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div
      onClick={handleMapClick}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        height: "200px",
        cursor: "pointer",
      }}
    >
      <MapKit token="eyJraWQiOiI0R1VDMjRBSFQzIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJSQjhaNDg5M1pVIiwiaWF0IjoxNzMyMTIyMjI1LCJvcmlnaW4iOiIqLmNvbXBhc3N3ZWFyYWJsZS5jb20ifQ.9ROMK16i2u9xdWre48SHbMd545rZxAnokbZ62D0kXVXjLTjS__nSFeXiNm53YdSlGSNAGTDYh5hklPsjQnjK4A">
        <Marker
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          title={address}
        />
      </MapKit>
    </div>
  );
};

export default Map;
