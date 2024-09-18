"use client";

import Fridge from "@/components/Fridge";
import styles from "./page.module.scss";
import RecipesSection from "./RecipesSection";
import { SessionProvider } from "next-auth/react";
import { IngredientsProvider } from "@/contexts/IngredientsContext";
import { MyRecipesProvider } from "@/contexts/MyRecipesContext";

const Recipes = () => {
  return (
    <SessionProvider>
      <IngredientsProvider>
        <MyRecipesProvider>
          <main className={styles.recipesPage}>
            <div className={styles.fridge}>
              <Fridge />
            </div>

            <div className={styles.recipes}>
              <RecipesSection />
            </div>
          </main>
        </MyRecipesProvider>
      </IngredientsProvider>
    </SessionProvider>
  );
};

export default Recipes;
