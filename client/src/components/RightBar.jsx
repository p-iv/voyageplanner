import styles from "./RightBar.module.css";
import MapComponent from "./MapComponent";
import AppContent from "./AppContent";

function RightBar() {
  return (
    <div className={styles.rightBar}>
      <AppContent />
      <MapComponent />
    </div>
  );
}

export default RightBar;
