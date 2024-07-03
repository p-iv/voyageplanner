import { useEffect } from "react";
import { usePlace } from "../context/PlaceContext";
import styles from "./Attractions.module.css";
import { useDestination } from "../context/DestinationContext";

import AttractionList from "./AttractionList";

function AttractionsList() {
  const { getLocation, places } = usePlace();
  const { mapLocation } = useDestination();

  console.log(places);

  useEffect(
    function () {
      if (Object.keys(mapLocation)) getLocation(mapLocation);
    },
    [mapLocation]
  );

  return (
    <div className={styles.attractions}>
      <h1>2 Step: Add Attractions </h1>
      <AttractionList />
    </div>
  );
}

export default AttractionsList;
