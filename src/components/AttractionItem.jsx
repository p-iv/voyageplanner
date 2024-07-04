import styles from "./AttractionItem.module.css";
import Image from "../components/UI/Image";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

function AttractionItem({ place }) {
  return (
    <div className={styles.attraction}>
      {place.photos.map((photo) => (
        <Image
          source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photo.photo_reference}&key=${API_KEY}`}
          alt_text="place image"
          type="attractionimage"
          key={photo.photo_reference}
        />
      ))}
      <p>{place.name}</p>
    </div>
  );
}

export default AttractionItem;
