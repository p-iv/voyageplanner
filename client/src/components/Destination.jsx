import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Destination.module.css";
import { useDestination } from "../context/DestinationContext";

import ImageCarousel from "./ImageCarousel";

import Spinner from "./UI/Spinner";
import { useTrip } from "../context/NewTripContext";

function Destination() {
  const { destinationId } = useParams();
  const { getDestination, currentDestination, isLoading, getLocation } =
    useDestination();
  const { dispatch, destination } = useTrip();
  const photos = currentDestination.photos;

  useEffect(
    function () {
      getDestination(destinationId);
      getLocation(destinationId);
    },
    [destinationId]
  );

  function handleSubmitDestination() {
    if (currentDestination)
      dispatch({
        type: "set/destination",
        payload: currentDestination.formatted_address,
      });
  }
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
        </div>
      )}
    </>
  );
}
export default Destination;
