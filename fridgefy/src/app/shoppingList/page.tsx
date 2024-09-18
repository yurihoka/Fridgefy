"use client";

import Fridge from "@/components/Fridge";
import RecipeList from "@/app/shoppingList/RecipeList";
import ItemsToBuy from "@/app/shoppingList/BuyItemsList";
import styles from "./shoppingList.module.scss";
import { SessionProvider } from "next-auth/react";
import { IngredientsProvider } from "@/contexts/IngredientsContext";
import { MyRecipesProvider } from "@/contexts/MyRecipesContext";
import { ItemsToBuyProvider } from "@/contexts/ItemsToBuyContext";

const ShoppingList = () => {
  return (
    <SessionProvider>
      <IngredientsProvider>
        <MyRecipesProvider>
          <main className={styles.wrapper}>
            <Fridge />
            <ItemsToBuyProvider>
              <RecipeList />
              <ItemsToBuy />
            </ItemsToBuyProvider>
          </main>
        </MyRecipesProvider>
      </IngredientsProvider>
    </SessionProvider>
  );
};

export default ShoppingList;
