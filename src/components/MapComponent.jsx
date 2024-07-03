import { APIProvider, Map, useMap, Marker } from "@vis.gl/react-google-maps";
import styles from "./MapComponent.module.css";
import { useEffect, useState } from "react";
import { useDestination } from "../context/DestinationContext";
import { usePlace } from "../context/PlaceContext";

function MapComponent() {
  const [mapPosition, setMapPosition] = useState({});
  const { mapLocation } = useDestination();
  const { places } = usePlace();

  useEffect(
    function () {
      if (Object.keys(mapLocation))
        setMapPosition({
          lat: +mapLocation.lat,
          lng: +mapLocation.lng,
        });
    },
    [mapLocation]
  );

  return (
    <APIProvider apiKey={"AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI"}>
      <div className={styles.mapContainer}>
        <Map
          defaultZoom={11}
          defaultCenter={{
            lat: 53.54992,
            lng: 10.00678,
          }}
        >
          {places.map((place) => (
            <Marker key={place.place_id} position={place.geometry.location} />
          ))}

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
