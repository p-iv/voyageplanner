import styles from "./AttractionItem.module.css";
import Image from "../components/UI/Image";
import { Link } from "react-router-dom";
import { Button } from "antd";
import StarRating from "./UI/StarRating";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";

function AttractionItem({ place }) {
  const { photos, name, place_id, icon, rating } = place;
  return (
    <li className={styles.attraction}>
      {photos.map((photo) => (
        <Image
          source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photo.photo_reference}&key=${API_KEY}`}
          alt_text="place image"
          type="attractionImage"
          key={photo.photo_reference}
        />
      ))}
      <div className={styles.name}>
        <img src={icon} />
        <h2>{name}</h2>
      </div>
      <div className={styles.rating}>
        <StarRating defaultRating={rating} size={24} />
        <p>{rating}</p>
      </div>

      <Link to={`${place_id}`}>
        <Button type="primary">More Info</Button>
      </Link>
    </li>
  );
}

export default AttractionItem;
