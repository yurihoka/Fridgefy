"use client";

import styles from "./recipesSection.module.scss";
import RecipesSearch from "./RecipesSearch";
import { useEffect, useState } from "react";
import RecipesList from "./RecipesList";
import MyRecipes from "./MyRecipes";
import { useSession } from "next-auth/react";
import { useMyRecipes } from "@/custom_hooks/useMyRecipes";
import RecipesFilter, { FilteredRecipeType } from "./RecipesFilter";
import { dummyRecipes } from "../data/dummyRecipes";
import ModalRecipeInfo from "./ModalRecipeInfo";

export type RecipeListType = {
  id: number;
  title: string;
  image: string;
  imageType?: string;
};

type DetailedRecipeInfoType = {
  id: number;
  title: string;
  image: string;
  summary: string;
};

const RecipesSection = () => {
  const { myRecipes, addMyRecipes, deleteMyRecipes } = useMyRecipes();

  const session = useSession();
  const userEmail = session?.data?.user?.email;
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string;

  // states
  const [recipesList, setRecipesList] = useState<RecipeListType[]>([]);
  const [detailedRecipeInfo, setDetailedRecipeInfo] =
    useState<DetailedRecipeInfoType>({
      id: 0,
      title: "",
      image: "",
      summary: "",
    });
  const [recipeInfoOpen, setRecipeInfoOpen] = useState<boolean>(false);
  const [showNoResults, setShowNoResults] = useState<boolean>(false);

  // functions
  useEffect(() => {
    const getRandomRecipes = async () => {
      try {
        // const response = await fetch(
        //   `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=18`
        // );
        // if (!response.ok) {
        //   throw new Error("Failed to fetch recipes data.");
        // }
        // const data = await response.json();
        // const randomRecipes = data.recipes;

        // temporarily use dummy recipes
        const parsedRandomRecipes = JSON.parse(dummyRecipes);
        const randomRecipes = parsedRandomRecipes.results;

        setRecipesList(randomRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    getRandomRecipes();
  }, []);

  const getRecipeInfo = async (id: number) => {
    try {
      // fetch the data of the clicked recipe from the auto complete suggestions
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false&addWinePairing=false&addTasteData=false`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes data.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addSearchedRecipeToRecipesList = async (id: number) => {
    const data = await getRecipeInfo(id);
    const recipeData: RecipeListType = {
      id: data.id,
      title: data.title,
      image: data.image,
    };
    // when a recipe is searched (not filtered), only one recipe is added to display
    setRecipesList([recipeData]);
  };

  const addFilteredRecipesToRecipesList = (
    filteredRecipes: FilteredRecipeType[]
  ) => {
    const newRecipesList = filteredRecipes;

    setRecipesList(newRecipesList);
  };

  const addToMyRecipes = async (id: number) => {
    const data = await getRecipeInfo(id);
    const myNewRecipe = data;

    if (!userEmail)
      return alert("You need to log in to add a recipe to your list.");

    const alreadyExists = myRecipes.some(
      (recipe) => recipe.id === myNewRecipe.id
    );
    if (alreadyExists)
      return alert("You already have the recipe in your recipes.");

    addMyRecipes(myNewRecipe);
  };

  const showRecipeInfo = async (id: number) => {
    const data = await getRecipeInfo(id);
    setDetailedRecipeInfo(data);
    setRecipeInfoOpen(!recipeInfoOpen);
  };

  const deleteRecipe = (id: number) => {
    const updatedMyRecipes = myRecipes.filter((recipe) => recipe.id !== id);
    deleteMyRecipes(id);
  };

  const updateLocalStorage = (updatedMyRecipes: any[]) => {
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

  return (
    <div className={styles.recipesSection}>
      <div className={styles.recipesSection__fetchedRecipes}>
        <RecipesSearch
          addSearchedRecipeToRecipesList={addSearchedRecipeToRecipesList}
          setShowNoResults={setShowNoResults}
        />
        <RecipesFilter
          addFilteredRecipesToRecipesList={addFilteredRecipesToRecipesList}
          setShowNoResults={setShowNoResults}
          setRecipesList={setRecipesList}
        />
        {recipeInfoOpen ? (
          <ModalRecipeInfo
            recipeInfo={detailedRecipeInfo}
            recipeInfoOpen={recipeInfoOpen}
            setRecipeInfoOpen={setRecipeInfoOpen}
          />
        ) : (
          ""
        )}
        <RecipesList
          recipesList={recipesList}
          addToMyRecipes={addToMyRecipes}
          showRecipeInfo={showRecipeInfo}
          showNoResults={showNoResults}
        />
      </div>
      <div className={styles.recipesSection__myRecipes}>
        <MyRecipes myRecipes={myRecipes} deleteRecipe={deleteRecipe} />
      </div>
    </div>
  );
};

export default RecipesSection;
