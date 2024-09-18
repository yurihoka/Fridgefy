import styles from "./ingredientForm.module.scss";
import { ChangeEvent, useState } from "react";
import { IngredientType } from "./IngredientItems";
import { useSession } from "next-auth/react";

type IngredientFormPropsType = {
  ingredients: IngredientType[];
  addIngredient: (ingredient: string) => void;
};

type IngredientDataFromApiType = {
  name: string;
  image: string;
};

const IngredientForm = ({
  ingredients,
  addIngredient,
}: IngredientFormPropsType) => {
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string;
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  // states
  const [ingredient, setIngredient] = useState<string>("");
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(
    []
  );

  // functions
  const autoComplete = async (query: string): Promise<string[] | null> => {
    try {
      // five ingredient names are auto completed based on the input letters
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&query=${query}&metaInformation=false&number=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ingredients data.");
      }
      const data = await response.json();
      return data.map(
        (ingredientData: IngredientDataFromApiType) => ingredientData.name
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!userEmail)
      return alert("You need to log in to use 'My Fridge' feature.");

    setIngredient(e.target.value);
    const suggestedIngredients = await autoComplete(e.target.value);
    setSuggestedIngredients(suggestedIngredients!);
  };

  const handleAdd = (addedIngredient: string) => {
    // validation: already added
    const alreadyAddedIngredients = ingredients.map(
      (ingredient) => ingredient.name
    );
    if (alreadyAddedIngredients.includes(addedIngredient))
      return alert("You have already added the ingredient to your fridge.");

    addIngredient(addedIngredient);
    setIngredient("");
    setSuggestedIngredients([]);
  };

  return (
    <>
      <p className={styles.fridge__title}>My Fridge</p>
      <form className={styles.fridge__form}>
        <input
          className={styles.fridge__inputIngredient}
          type="text"
          value={ingredient}
          onChange={handleInputChange}
          placeholder="What's in your fridge?"
        />
        {suggestedIngredients.length ? (
          <ul className={styles.fridge__suggestedIngredients}>
            {suggestedIngredients.map((suggestedIngredient) => (
              <li
                key={suggestedIngredient}
                className={styles.fridge__suggestedIngredient}
                onClick={() => {
                  handleAdd(suggestedIngredient);
                }}
              >
                <p>{suggestedIngredient}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </form>
    </>
  );
};

export default IngredientForm;
