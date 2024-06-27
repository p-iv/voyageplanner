import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Destination.module.css";
import { useDestination } from "../context/DestinationContext";

import DestinationImageCarousel from "./DestinationImageCarousel";
import { Button } from "antd";
function Destination() {
  const { id } = useParams();
  const { getDestination, currentDestination, isLoading, getLocation } =
    useDestination();
  const photos = currentDestination.photos;

  useEffect(
    function () {
      getDestination(id);
      getLocation(id);
    },
    [id]
  );

  return (
    <div className={styles.destination}>
      <DestinationImageCarousel photos={photos} />
      <h2>{currentDestination.formatted_address}</h2>
      <div className={styles.confirm}>
        <p>Your destination: {currentDestination.formatted_address}</p>
        <Link to="/app/attractions">
          <Button type="primary">Next Step</Button>
        </Link>
      </div>
    </div>
  );
}

export default Destination;
