import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import styles from "./MapComponent.module.css";
import { useEffect, useState } from "react";
import { useDestination } from "../context/DestinationContext";

function MapComponent() {
  const [mapPosition, setMapPosition] = useState({});
  const { mapLocation } = useDestination();
  useEffect(
    function () {
      if (Object.keys(mapLocation)) setMapPosition(mapLocation);
    },
    [mapLocation]
  );

  return (
    <APIProvider apiKey={"AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI"}>
      <div className={styles.mapContainer}>
        <Map
          defaultZoom={10}
          defaultCenter={{
            lat: 53.54992,
            lng: 10.00678,
          }}
        >
          <ChangeCenter position={mapPosition} />
        </Map>
      </div>
    </APIProvider>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setCenter(position);
  return null;
}

export default MapComponent;
