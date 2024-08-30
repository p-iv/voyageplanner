import styles from "./AppLayout.module.scss";
import PageNav from "../components/PageNav";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";

function AppLayout() {
  return (
    <main className={styles.app}>
      <PageNav />
      <LeftBar />
      <RightBar />
    </main>
  );
}

export default AppLayout;
