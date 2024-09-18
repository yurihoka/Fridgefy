"use client";

import Accordion from "./Accordion";
import { useMyRecipes } from "@/custom_hooks/useMyRecipes";
import styles from "./recipeList.module.scss";

export default function RecipeList() {
  // States
  const { myRecipes } = useMyRecipes();

  return (
    <div className={styles.wrapper}>
      <Accordion recipes={myRecipes} />
    </div>
  );
}
