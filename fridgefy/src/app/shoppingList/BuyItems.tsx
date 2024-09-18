"use client";

import { IngredientType } from "@/components/IngredientItems";
import { useIngredients } from "@/custom_hooks/useIngredients";
import { useItemsToBuy } from "@/custom_hooks/useItemsToBuy";
import { useSession } from "next-auth/react";
import styles from "./buyItems.module.scss";

type Recipe = {
  id: number;
  extendedIngredients: any[];
  name: string;
};

export default function BuyItems({ recipes }: { recipes: Recipe[] }) {
  const { itemsToBuy } = useItemsToBuy();
  const { ingredients, setIngredients } = useIngredients();
  const session = useSession();

  const items = itemsToBuy
    .filter(
      (item: any) =>
        !ingredients.map((ingredient) => ingredient.name).includes(item)
    )
    .filter(
      (item: any, index: any, arr: string | any[]) =>
        arr.indexOf(item) === index
    );

  const updateLocalStorage = (
    userEmail: string | undefined | null,
    updatedIngredients: IngredientType[]
  ) => {
    if (!userEmail) return;
    const localStorageData = localStorage.getItem(userEmail); // can be null

    let parsedLocalStorageData;
    if (localStorageData) {
      parsedLocalStorageData = JSON.parse(localStorageData);
    } else {
      parsedLocalStorageData = {
        fridge: [],
        recipes: [],
      };
    }

    parsedLocalStorageData.fridge = updatedIngredients;
    const updatedLocalStorageData = JSON.stringify(parsedLocalStorageData);
    localStorage.setItem(userEmail, updatedLocalStorageData);
  };

  return (
    <ul>
      {items.map((ingredient: any) => (
        <li key={ingredient} className={styles.buyItem}>
          <p className={styles.buyItemName}>{ingredient}</p>
          <button
            className={styles.button}
            onClick={() => {
              const updatedIngredients = [
                ...ingredients,
                { name: ingredient, checked: false },
              ];
              setIngredients(updatedIngredients);
              updateLocalStorage(
                session?.data?.user?.email,
                updatedIngredients
              );
            }}
          >
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
