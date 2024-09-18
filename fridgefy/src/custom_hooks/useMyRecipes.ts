import { useContext } from "react";
import { MyRecipesContext } from "@/contexts/MyRecipesContext";

// 3-1. create a custom hook to prevent the shared value from being undefined to let other components have access to the shared value
export const useMyRecipes = () => {
  const myRecipes = useContext(MyRecipesContext);

  if (!myRecipes) {
    throw new Error("useMyRecipes must be used with a MyRecipesContext.");
  }

  return myRecipes;
};
