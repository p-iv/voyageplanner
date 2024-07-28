import { memo } from "react";
import { Carousel } from "antd";
import Image from "./UI/Image";
import styles from "./ImageCarousel.module.css";

const API_KEY = "AIzaSyAUgy97d-8V-p70KKlbyVR3MFQxUnqoGGI";
const ImageCarousel = memo(function ImageCarousel({
  photos,
  carouselType,
  type,
  alt_text,
}) {
  return (
    <Carousel className={`${styles[carouselType]}`} arrows infinite={true}>
      {photos?.map((photo) => (
        <Image
          source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`}
          type={type}
          alt_text={alt_text}
          key={photo.photo_reference}
        />
      ))}
    </Carousel>
  );
});

export default ImageCarousel;
