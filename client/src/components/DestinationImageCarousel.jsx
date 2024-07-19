import { Carousel } from "antd";
import Image from "./UI/Image";
import styles from "./DestinationImageCarousel.module.css";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";
function DestinationImageCarousel({ photos }) {
  if (photos === undefined) return;
  return (
    <Carousel className={styles.carousel} arrows infinite={true}>
      {photos.map((photo) => (
        <Image
          source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`}
          type="destinationImage"
          alt_text="city image"
          key={photo.photo_reference}
        />
      ))}
    </Carousel>
  );
}

export default DestinationImageCarousel;
