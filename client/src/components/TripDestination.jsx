import styles from "./TripDestination.module.scss";

function TripDestination({ destination }) {
  return (
    <div className={styles.tripDestination}>
      <h2>{destination.name}</h2>
      <ul className={styles.tripAttractions}>
        {destination.attractions.map((attraction) => (
          <li key={attraction.id}>{attraction.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TripDestination;
