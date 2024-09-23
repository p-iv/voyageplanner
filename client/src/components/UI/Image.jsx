import styles from "./Image.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Image({ source, alt_text, type }) {
  return (
    <div className={styles.imageContainer}>
      <LazyLoadImage
        loading="lazy"
        className={`${styles[type]}`}
        effect="blur"
        src={source}
        alt={alt_text}
      />
    </div>
  );
}

export default Image;
