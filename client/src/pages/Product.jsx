import AppNav from "../components/AppNav";
import styles from "./Product.module.scss";

function Product() {
  return (
    <main className={styles.product}>
      <AppNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About VoyagePlanner</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis,
          </p>
          <p>
            laboriosam at fuga perspiciatis?Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Corporis doloribus libero sunt
            expedita ratione iusto, magni, id sapiente sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Product;
