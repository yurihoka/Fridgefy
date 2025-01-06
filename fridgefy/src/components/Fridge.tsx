import IngredientForm from "./IngredientForm";
import IngredientItems, { IngredientType } from "./IngredientItems";
import { useSession } from "next-auth/react";
import { useIngredients } from "@/custom_hooks/useIngredients";

const Fridge = () => {
  const { ingredients, setIngredients } = useIngredients();

  const session = useSession();
  const userEmail = session?.data?.user?.email;

  const addIngredient = (name: string) => {
    // if the 'name' dosen't exist in the ingredients data, it shoudn't be validated
    const newIngredient = { name, checked: false };
    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    updateLocalStorage(updatedIngredients);
  };

  const toggleIngredient = (name: string) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.name === name) {
        return { ...ingredient, checked: !ingredient.checked };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);
    updateLocalStorage(updatedIngredients);
  };

  const deleteIngredient = (name: string) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== name
    );
    setIngredients(updatedIngredients);
    updateLocalStorage(updatedIngredients);
  };

  const updateLocalStorage = (updatedIngredients: IngredientType[]) => {
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

    parsedLocalStorageData.fridge = updatedIngredients;
    const updatedLocalStorageData = JSON.stringify(parsedLocalStorageData);
    localStorage.setItem(userEmail, updatedLocalStorageData);
  };

  return (
    <div>
      <IngredientForm ingredients={ingredients} addIngredient={addIngredient} />
      <IngredientItems
        ingredients={ingredients}
        toggleIngredient={toggleIngredient}
        deleteIngredient={deleteIngredient}
      />
    </div>
  );
};

export default Fridge;
