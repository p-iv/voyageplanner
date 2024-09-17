import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./Destination.module.scss";
import { useDestination } from "../context/DestinationContext";

import ImageCarousel from "./ImageCarousel";

import Spinner from "./UI/Spinner";
import { useTrip } from "../context/NewTripContext";
import DestinationNav from "./DestinationNav";

function Destination() {
  const { destinationId } = useParams();
  const { getDestination, currentDestination, isLoading, getLocation } =
    useDestination();
  const { dispatch } = useTrip();
  const photos = currentDestination.photos;

  useEffect(
    function () {
      getDestination(destinationId);
      getLocation(destinationId);
    },
    [destinationId]
  );

  useEffect(
    function () {
      dispatch({
        type: "set/destination",
        payload: currentDestination.formatted_address,
      });
    },
    [currentDestination]
  );
  return (
    <>
      <DestinationNav />
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
