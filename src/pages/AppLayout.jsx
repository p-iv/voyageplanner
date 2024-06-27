import styles from "./AppLayout.module.css";
import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import MapComponent from "../components/MapComponent";

function AppLayout() {
  return (
    <main className={styles.app}>
      <AppNav />
      <SideBar />
      <MapComponent />
    </main>
  );
}

export default AppLayout;
