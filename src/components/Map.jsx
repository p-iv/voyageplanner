import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useDestination } from "../context/DestinationContext";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { mapLocation } = useDestination();
  useEffect(
    function () {
      if (mapLocation.length) setMapPosition(mapLocation);
    },
    [mapLocation]
  );

  return (
    <div className={styles.mapcontainer}>
      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
