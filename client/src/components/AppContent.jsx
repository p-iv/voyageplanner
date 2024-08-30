import styles from "./AppContent.module.scss";
import { Outlet } from "react-router-dom";
function AppContent() {
  return (
    <div className={styles.appContent}>
      <Outlet />
    </div>
  );
}

export default AppContent;
