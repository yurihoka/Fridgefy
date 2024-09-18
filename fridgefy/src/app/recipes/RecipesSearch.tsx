import styles from "./recipesSearch.module.scss";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

type RecipeDataFromApiType = {
  id: number;
  title: string;
  imageType: string;
};

type RecipesSearchPropsType = {
  addSearchedRecipeToRecipesList: (id: number) => {};
  setShowNoResults: Dispatch<SetStateAction<boolean>>;
};

const RecipesSearch = ({
  addSearchedRecipeToRecipesList,
  setShowNoResults,
}: RecipesSearchPropsType) => {
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string;

  // states
  const [recipe, setRecipe] = useState<string>("");
  const [suggestedRecipesData, setSuggestedRecipesData] = useState<
    RecipeDataFromApiType[]
  >([]);

  // functions
  const autoComplete = async (
    query: string
  ): Promise<RecipeDataFromApiType[] | null> => {
    try {
      // five recipes are auto completed based on the input letters
      const response = await fetch(
        `https://api.spoonacular.com/recipes/autocomplete?apiKey=${API_KEY}&number=5&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes data.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setRecipe(e.target.value);
    const suggestedRecipes = await autoComplete(e.target.value);
    // no ! if ...
    if (suggestedRecipes) setSuggestedRecipesData(suggestedRecipes);
  };

  // when users clik one of the suggested recipes, it is set in the input field and the recipe's data is fetched based on its id from the API.
  const handleClick = (clickedRecipeId: number, clickedRecipe: string) => {
    setRecipe("");
    setShowNoResults(false);
    addSearchedRecipeToRecipesList(clickedRecipeId);
    setSuggestedRecipesData([]);
  };

  return (
    <div className={styles.recipesSearch}>
      <p className={styles.recipesSearch__title}>Search Recipes</p>
      <div className={styles.recipesSearch__container}>
        <input
          className={styles.recipesSearch__input}
          onChange={handleChange}
          type="text"
          value={recipe}
          placeholder="Search recipes with keywords."
        />
        {suggestedRecipesData.length ? (
          <ul className={styles.recipesSearch__suggestedRecipes}>
            {suggestedRecipesData.map((recipeData) => (
              <li
                className={styles.recipesSearch__suggestedRecipe}
                key={recipeData.id}
                onClick={() => {
                  handleClick(recipeData.id, recipeData.title);
                }}
              >
                <p>{recipeData.title}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default RecipesSearch;
