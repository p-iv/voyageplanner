import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import styles from "./MapComponent.module.css";
import { useEffect, useState } from "react";
import { useDestination } from "../context/DestinationContext";
import { usePlace } from "../context/PlaceContext";
import { useParams } from "react-router-dom";
import { useTrip } from "../context/NewTripContext";

function MapComponent() {
  const [mapPosition, setMapPosition] = useState({});
  const { attractionId } = useParams();
  const { lat, lng } = useDestination();
  const { places } = usePlace();
  const { activeDestinationForm } = useTrip();

  useEffect(
    function () {
      setMapPosition({
        lat: lat,
        lng: lng,
      });
    },
    [lat, lng]
  );

  return (
    <APIProvider apiKey={"AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI"}>
      <div
        className={
          activeDestinationForm
            ? styles.mapContainerActive
            : styles.mapContainerNotActive
        }
      >
        <Map
          defaultZoom={11}
          defaultCenter={{
            lat: 53.54992,
            lng: 10.00678,
          }}
          mapId="480b6ae26e4d1ac7"
        >
          {places.map((place) => (
            <AdvancedMarker
              key={place.place_id}
              position={place.geometry.location}
            >
              {attractionId !== place.place_id ? (
                <Pin
                  background={"#007bff"}
                  borderColor={"#eef4f4"}
                  glyphColor={"#eef4f4"}
                />
              ) : (
                <Pin
                  background={"#fd7e14"}
                  borderColor={"#eef4f4"}
                  glyphColor={"#ffc107"}
                />
              )}
            </AdvancedMarker>
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
