import styles from "./User.module.scss";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  return (
    <div className={styles.user}>
      <img src={FAKE_USER.avatar} alt={FAKE_USER.name} />
      <div>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default User;
