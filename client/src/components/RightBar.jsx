import styles from "./RightBar.module.css";
import MapComponent from "./MapComponent";
import AppContent from "./AppContent";
import { useTrip } from "../context/NewTripContext";

function RightBar() {
  const { activeDestinationForm } = useTrip();

  return (
    <div className={styles.rightBar}>
      {activeDestinationForm && <AppContent />}
      <MapComponent />
    </div>
  );
}

export default RightBar;
