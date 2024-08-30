import styles from "./Review.module.scss";
import StarRating from "./UI/StarRating";

function Review({ review }) {
  const {
    author_name,
    profile_photo_url,
    rating,
    text,
    relative_time_description,
  } = review;
  return (
    <>
      <li className={styles.review}>
        <div className={styles.author}>
          <img src={profile_photo_url} alt={author_name} />
          <div>{author_name}</div>
        </div>
        <div className={styles.rating}>
          <StarRating defaultRating={rating} size={16} />
          <p>{rating}</p>
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.time}>{relative_time_description}</div>
      </li>
    </>
  );
}

export default Review;
