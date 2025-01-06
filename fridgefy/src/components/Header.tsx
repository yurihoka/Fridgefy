import styles from "./header.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavButton from "./NavButton";
import LogInButton from "./LogInButton";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>Fridgefy</div>
      <ul className={styles.header__nav}>
        <li className={styles.header__link}>
          <NavButton href="/">Home</NavButton>
        </li>
        <li className={styles.header__link}>
          <NavButton href="/recipes">Recipes</NavButton>
        </li>
        <li className={styles.header__link}>
          <NavButton href="/shoppingList">Shopping List</NavButton>
        </li>
      </ul>
      <div className={styles.header__logOut}>
        {session ? (
          <NavButton href="/api/auth/signout">
            Log Out
            <br />
          </NavButton>
        ) : (
          <LogInButton />
        )}
      </div>
    </header>
  );
};

export default Header;
