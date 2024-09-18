import { useContext } from "react";
import { IngredientsContext } from "@/contexts/IngredientsContext";

// 3-1. create a custom hook to prevent the shared value from being undefined to let other components have access to the shared value
export const useIngredients = () => {
  const ingredients = useContext(IngredientsContext);

  if (!ingredients) {
    throw new Error("useIngredients must be used with a IngredietnsContext.");
  }

  return ingredients;
};
