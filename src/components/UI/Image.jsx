import styles from "./Image.module.css";

function Image({ source, alt_text, type }) {
  return (
    <div className={styles.imageContainer}>
      <img className={`${styles[type]}`} src={source} alt={alt_text} />
    </div>
  );
}

export default Image;