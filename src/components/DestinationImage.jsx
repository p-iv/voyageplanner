import styles from "./DestinationImage.module.css";

const API_KEY = "AIzaSyCOxyyTfRJfz2oOz-DLbzwLWFGMYjnuboE";

function DestinationImage({ photoReference }) {
  return (
    <div className={styles.imagecontainer}>
      <img
        className={styles.image}
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`}
        alt="city image"
      />
    </div>
  );
}

export default DestinationImage;
