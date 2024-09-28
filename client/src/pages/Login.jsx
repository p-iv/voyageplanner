import { useState } from "react";
import styles from "./Login.module.scss";
import AppNav from "../components/AppNav";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const user = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
=======
    login(user);
>>>>>>> d642b13c1109b281b0e799c627e62ba7e12996c9
    setEmail("");
    setPassword("");
  };
  return (
    <main className={styles.login}>
      <AppNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Log In</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <b>Sign Up</b>
          </Link>
        </p>
      </form>
    </main>
  );
}
