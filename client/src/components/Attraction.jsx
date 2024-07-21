import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { usePlace } from "../context/PlaceContext";
import { useTrip } from "../context/NewTripContext";

import styles from "./Attraction.module.css";
import Spinner from "./UI/Spinner";
import ImageCarousel from "./ImageCarousel";
import StarRating from "./UI/StarRating";
import { AimOutlined, GlobalOutlined } from "@ant-design/icons";
import Review from "./Review";
import { Button } from "antd";

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
  } = currentPlace;
  useEffect(
    function () {
      getPlace(attractionId);
    },
    [attractionId]
  );

  function handleAddAttraction() {
    if (currentPlace)
      dispatch({
        type: "set/attractions",
        payload: [...attractions, currentPlace],
      });
  }
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
          {!activeReviews ? (
            <button
              className={styles.show}
              onClick={() => setActiveReviews(!activeReviews)}
            >
              Show Reviews
            </button>
          ) : (
            <>
              <button
                className={styles.hide}
                onClick={() => setActiveReviews(!activeReviews)}
              >
                Hide Reviews
              </button>
              <ul className={styles.reviews}>
                {reviews?.map((review, index) => (
                  <Review key={index} review={review} />
                ))}
              </ul>
            </>
          )}
          <Button type="primary" onClick={handleAddAttraction}>
            Add Attraction
          </Button>
          {attractions.length != 0 && (
            <div className={styles.confirmAttraction}>
              <p>You Added {attractions.length} Attractions</p>
              <Link to="/app/schedule">
                <Button type="default">Next Step</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Attraction;
