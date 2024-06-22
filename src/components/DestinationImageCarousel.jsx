import { Carousel } from "antd";
import DestinationImage from "./DestinationImage";
import styles from "./DestinationImageCarousel.module.css";

function DestinationImageCarousel({ photos }) {
  if (photos === undefined) return;
  return (
    <Carousel className={styles.carousel} arrows infinite={false}>
      {photos.map((photo) => (
        <DestinationImage
          key={photo.photo_reference}
          photoReference={photo.photo_reference}
        />
      ))}
    </Carousel>
  );
}

export default DestinationImageCarousel;
