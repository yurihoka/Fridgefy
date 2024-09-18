import { useMyRecipes } from "@/custom_hooks/useMyRecipes";
import BuyItems from "./BuyItems";
import styles from "./buyItemsList.module.scss";

export default function BuyItemsList() {
  const { myRecipes } = useMyRecipes();

  return (
    <div>
      <p className={styles.title}>Items To Buy</p>
      <BuyItems recipes={myRecipes} />
    </div>
  );
}
