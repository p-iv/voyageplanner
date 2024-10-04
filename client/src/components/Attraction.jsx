import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { usePlace } from "../context/PlaceContext";
import { useTrip } from "../context/NewTripContext";

import styles from "./Attraction.module.scss";
import Spinner from "./UI/Spinner";
import ImageCarousel from "./ImageCarousel";
import StarRating from "./UI/StarRating";
import { AimOutlined, GlobalOutlined } from "@ant-design/icons";
import Review from "./Review";
import Button from "./UI/Button";

function Attraction() {
  const { attractionId } = useParams();
  const [activeReviews, setActiveReviews] = useState(false);

  const { getPlace, currentPlace, isLoading } = usePlace();
  const { dispatch, attractions } = useTrip();
  const {
    photos,
    formatted_address,
    name,
    rating,
    reviews,
    website,
    current_opening_hours,
    place_id,
  } = currentPlace;
  const existingId = attractions.find(
    (attraction) => attraction.place_id === place_id
  );
  useEffect(
    function () {
      getPlace(attractionId);
    },
    [attractionId]
  );

  const handleAddAttraction = () => {
    if (!existingId) {
      dispatch({
        type: "set/attractions",
        payload: [...attractions, currentPlace],
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.attraction}>
          <ImageCarousel
            photos={photos}
            carouselType="attractionCarousel"
            type="attractionImage"
            alt_text="place image"
          />
          <h2>{name}</h2>
          <div className={styles.rating}>
            <StarRating defaultRating={rating} size={24} />
            <p>{rating}</p>
          </div>
          <div className={styles.info}>
            <div className={styles.address}>
              <AimOutlined />
              <p>{formatted_address}</p>
            </div>

            {website && (
              <div className={styles.website}>
                <GlobalOutlined />
                <a href={website} target="_blank">
                  {website}
                </a>
              </div>
            )}
            <div className={styles.openingHours}>
              {current_opening_hours ? <p>Opening Hours:</p> : ""}
              {current_opening_hours &&
                current_opening_hours.weekday_text.map((hour, index) => (
                  <p key={index}>{hour}</p>
                ))}
            </div>
          </div>

          <button
            className={styles.reviewButton}
            onClick={() => setActiveReviews(!activeReviews)}
          >
            {activeReviews ? "Hide Reviews" : "Show Reviews"}
          </button>

          {activeReviews && (
            <ul className={styles.reviews}>
              {reviews?.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </ul>
          )}

          <div className={styles.confirmAttraction}>
            <Link to="/app/attractions">
              <Button type="back">Back</Button>
            </Link>
            {!existingId && (
              <Button type="primary" onClick={handleAddAttraction}>
                Add Attraction
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Attraction;
