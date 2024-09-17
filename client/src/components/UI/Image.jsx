import styles from "./Image.module.scss";

function Image({ source, alt_text, type }) {
  return (
    <div className={styles.imageContainer}>
      <img
        loading="lazy"
        className={`${styles[type]}`}
        src={source}
        alt={alt_text}
      />
    </div>
  );
}

export default Image;
