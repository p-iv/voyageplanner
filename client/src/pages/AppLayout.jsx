import styles from "./AppLayout.module.css";
import AppNav from "../components/AppNav";
import MainComponent from "../components/MainComponent";
import MapComponent from "../components/MapComponent";

function AppLayout() {
  return (
    <main className={styles.app}>
      <AppNav />
      <MainComponent />
      <MapComponent />
    </main>
  );
}

export default AppLayout;
