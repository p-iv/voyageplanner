import AddedAttractionItem from "./AddedAttractionItem";
import styles from "./AddedAttractions.module.scss";

function AddedAttractions({ attractions, deleteAttraction }) {
  return (
    <ul className={styles.addedAttractions}>
      {attractions.map((attraction) => (
        <AddedAttractionItem
          attraction={attraction}
          key={attraction.id}
          deleteAttraction={deleteAttraction}
        />
      ))}
    </ul>
  );
}

export default AddedAttractions;
