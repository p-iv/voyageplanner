import styles from "./AppLayout.module.css";
import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

function AppLayout() {
  return (
    <main className={styles.app}>
      <AppNav />
      <SideBar />
      <Map />
    </main>
  );
}

export default AppLayout;
