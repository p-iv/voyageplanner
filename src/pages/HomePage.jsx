import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1> VoyagePlanner Will Plan Your Next Adventure</h1>

        <h2>
          Plan your perfect trip effortlessly with our travel planning app.
          Discover destinations, add attractions, create personalized
          itineraries, and manage your travel schedule all in one place.
        </h2>

        <Link to="/login" className="cta">
          Plan Your Trip Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
