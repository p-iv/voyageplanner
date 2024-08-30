import styles from "./Pricing.module.scss";

import AppNav from "../components/AppNav";
function Product() {
  return (
    <main className={styles.pricing}>
      <AppNav />
      <section>
        <img src="img-2.jpg" alt="city view" />
        <div>
          <h2>Just for 7$/month</h2>
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
