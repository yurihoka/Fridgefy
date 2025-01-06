"use client";

import { IngredientType } from "@/components/IngredientItems";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// 1-2. define the type of the context
type IngredientsContextType = {
  ingredients: IngredientType[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>>;
};

// 1-3. define the initial value for the context
// const IngredientsInitialValue: IngredientsContextType = {
//   ingredients: [],
//   setIngredients: () => {},
// };

// 1-1. create a context with its 1. type & 2. initial value
export const IngredientsContext = createContext<IngredientsContextType | null>(
  null
);

// 2-1. create and export the provider component for the context(object)
// It takes children as a prop, which will be the other components that want to access the 'cartItems' data.
export function IngredientsProvider({ children }: { children: ReactNode }) {
  // 2-2. write necessary states, functions etc ... to share throughout all the components
  // states, reducers / functions
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  //states
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  //functions

  useEffect(() => {
    const getIngredientsFromLocalStorage = () => {
      if (!userEmail) return;
      const localStorageData = localStorage.getItem(userEmail);

      if (!localStorageData) return;

      const parsedData = JSON.parse(localStorageData);
      const ingredientsData = parsedData.fridge;

      if (ingredientsData.length === 0) return;

      setIngredients(ingredientsData);
    };
    getIngredientsFromLocalStorage();
  }, [userEmail]);

  // 2-3. return the context object with 'Provider' property and available value
  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
}
