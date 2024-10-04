import styles from "./AttractionItem.module.scss";
import Image from "../components/UI/Image";
import { Link } from "react-router-dom";
import StarRating from "./UI/StarRating";
import { usePlace } from "../context/PlaceContext";
import Spinner from "./UI/Spinner";

const API_KEY = process.env.GOOGLEMAPS_API_KEY;

function AttractionItem({ place }) {
  const { isLoading } = usePlace();
  const { photos, name, place_id, rating } = place;

  console.log("API_KEY:", API_KEY);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Link to={`${place_id}`}>
          <li className={styles.attraction}>
            {photos?.map((photo) => (
              <Image
                source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photo.photo_reference}&key=${API_KEY}`}
                alt_text="place image"
                type="attractionItemImage"
                key={photo.photo_reference}
              />
            ))}

            <h2>{name}</h2>
            <div className={styles.rating}>
              <StarRating defaultRating={rating} size={24} />
              <p>{rating}</p>
            </div>
          </li>
        </Link>
      )}
    </>
  );
}

export default AttractionItem;
