"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// 1-2. define the type of the context
type MyRecipesContextType = {
  myRecipes: any[];
  addMyRecipes: (recipe: any) => boolean;
  deleteMyRecipes: (recipeId: number) => void;
};

// 1-3. define the initial value for the context
// const MyRecipesInitialValue: MyRecipesContextType = {
//   myRecipes: [],
//   setMyRecipes: () => {},
// };

// 1-1. create a context with its 1. type & 2. initial value
export const MyRecipesContext = createContext<MyRecipesContextType | null>(
  null
);

// 2-1. create and export the provider component for the context(object)
// It takes children as a prop, which will be the other components that want to access the 'cartItems' data.
export function MyRecipesProvider({ children }: { children: ReactNode }) {
  // 2-2. write necessary states, functions etc ... to share throughout all the components
  // states, reducers / functions
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  //states
  const [myRecipes, setMyRecipes] = useState<any[]>([]);

  // functions
  useEffect(() => {
    const getRecipesFromLocalStorage = () => {
      if (!userEmail) return;
      const localStorageData = localStorage.getItem(userEmail);

      if (!localStorageData) return;

      const parsedData = JSON.parse(localStorageData);
      const myLocalRecipesData = parsedData.recipes;

      if (myLocalRecipesData.length === 0) return;

      setMyRecipes(myLocalRecipesData);
    };
    getRecipesFromLocalStorage();
  }, [userEmail]);

  // MyRecipesContext.tsx
  const addMyRecipes = (recipe: any): boolean => {
    if (myRecipes.some((r) => r.id === recipe.id)) {
      return false;
    }
    const recipes = [...myRecipes, recipe];
    setMyRecipes(recipes);
    updateLocalStorage(userEmail, recipes);
    return true;
  };

  const deleteMyRecipes = (recipeId: number) => {
    const updatedMyRecipes = myRecipes.filter((r) => r.id !== recipeId);
    setMyRecipes(updatedMyRecipes);
    updateLocalStorage(userEmail, updatedMyRecipes);
  };

  const updateLocalStorage = (
    userEmail: string | null | undefined,
    updatedMyRecipes: any[]
  ) => {
    if (!userEmail) return;
    const localStorageData = localStorage.getItem(userEmail); // can be null

    let parsedLocalStorageData;
    if (localStorageData) {
      parsedLocalStorageData = JSON.parse(localStorageData);
    } else {
      // initialize the local storage data in case it is empty
      parsedLocalStorageData = {
        fridge: [],
        recipes: [],
      };
    }
    parsedLocalStorageData.recipes = updatedMyRecipes;
    const updatedLocalStorageData = JSON.stringify(parsedLocalStorageData);
    localStorage.setItem(userEmail, updatedLocalStorageData);
  };

  // 2-3. return the context object with 'Provider' property and available value
  return (
    <MyRecipesContext.Provider
      value={{ myRecipes, addMyRecipes, deleteMyRecipes }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}
