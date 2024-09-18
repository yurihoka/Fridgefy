import Image from "next/image";
import styles from "./page.module.css";
import NavButton from "@/components/NavButton";
import LogInButton from "@/components/LogInButton";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className={styles.main}>
      <div className={styles.background_image} style={{ position: "relative" }}>
        <Image
          src="/nathan-dumlao-bRdRUUtbxO0-unsplash.jpg"
          alt="background image"
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className={styles.content}>
        <div>
          <h1>Fridgefy</h1>
          <p>Your ultimate destination for culinary inspiration.</p>
        </div>
        {session ? (
          <NavButton href="/recipes">Go to Recipes</NavButton>
        ) : (
          <LogInButton />
        )}
      </div>
    </main>
  );
}
