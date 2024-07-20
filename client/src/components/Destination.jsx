import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Destination.module.css";
import { useDestination } from "../context/DestinationContext";

import ImageCarousel from "./ImageCarousel";
import { Button } from "antd";
import Spinner from "./UI/Spinner";

function Destination() {
  const { destinationId } = useParams();
  const { getDestination, currentDestination, isLoading, getLocation } =
    useDestination();
  const photos = currentDestination.photos;

  useEffect(
    function () {
      getDestination(destinationId);
      getLocation(destinationId);
    },
    [destinationId]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.destination}>
          <ImageCarousel
            photos={photos}
            carouselType="destinationCarousel"
            type="destinationImage"
            alt_text="city image"
          />
          <h2>{currentDestination.formatted_address}</h2>
          <div className={styles.confirm}>
            <p>Your destination: {currentDestination.formatted_address}</p>
            <Link to="/app/attractions">
              <Button type="primary">Next Step</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export default Destination;
