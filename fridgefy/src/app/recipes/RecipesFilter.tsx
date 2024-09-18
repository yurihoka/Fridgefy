// "use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./recipesFilter.module.scss"; // Import your styles
import {
  cuisinesOptions,
  dietsOptions,
  intolerancesOptions,
} from "../data/recipesFilterOptions";
import dynamic from "next/dynamic";
import { useIngredients } from "@/custom_hooks/useIngredients";
import { RecipeListType } from "./RecipesSection";

// This line is to solve a warning issue related to the dropdown menus. It's working well thanks to Henil, although I don't know how it's exactly working.
const AsyncSelect = dynamic(() => import("react-select"), { ssr: false });

type DropdownOptionType = {
  value: string;
  label: string;
};

type FiltersType = {
  cuisines: string[];
  intolerances: string[];
  diets: string[];
};

export type FilteredRecipeType = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

type RecipesFilterPropsType = {
  addFilteredRecipesToRecipesList: (recipes: FilteredRecipeType[]) => void;
  setShowNoResults: Dispatch<SetStateAction<boolean>>;
  setRecipesList: Dispatch<SetStateAction<RecipeListType[]>>;
};

const RecipesFilter = ({
  addFilteredRecipesToRecipesList,
  setShowNoResults,
  setRecipesList,
}: RecipesFilterPropsType) => {
  const { ingredients, setIngredients } = useIngredients();

  // states
  const [selectedCuisines, setSelectedCuisines] = useState<unknown>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<unknown>([]);
  const [selectedDiets, setSelectedDiets] = useState<unknown>([]);
  // State to store all the selected filter options
  const [allFilters, setAllFilters] = useState<FiltersType>({
    cuisines: [],
    intolerances: [],
    diets: [],
  });

  // functions
  const handleCuisinesChange = (selectedCuisines: unknown) => {
    setSelectedCuisines(selectedCuisines);
    const cuisines = (selectedCuisines as DropdownOptionType[]).map(
      (option) => option.value
    );
    setAllFilters({ ...allFilters, cuisines: cuisines });
  };

  const handleIntolerancesChange = (selectedIntolerances: unknown) => {
    setSelectedIntolerances(selectedIntolerances);
    const intolerances = (selectedIntolerances as DropdownOptionType[]).map(
      (option) => option.value
    );
    setAllFilters({ ...allFilters, intolerances: intolerances });
  };

  const handleDietsChange = (selectedDiets: unknown) => {
    setSelectedDiets(selectedDiets);
    const diets = (selectedDiets as DropdownOptionType[]).map(
      (option) => option.value
    );
    setAllFilters({ ...allFilters, diets: diets });
  };

  const getCheckedIngredientsForFiltering = () => {
    const checkedIngredientItems = ingredients.filter(
      (ingredient) => ingredient.checked
    );
    const checkedIngredients = checkedIngredientItems.map(
      (ingredient) => ingredient.name
    );
    return checkedIngredients;
  };

  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string;

  const getFilteredRecipes = async (
    cuisines: string,
    diets: string,
    intolerances: string,
    ingredients: string
  ) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisines}&diet=${diets}&intolerances=${intolerances}&includeIngredients=${ingredients}&number=6`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes data.");
      }
      const data = await response.json();
      console.log(data);

      const filteredRecipesResults = data.results;
      return filteredRecipesResults;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    const checkedIngredients = getCheckedIngredientsForFiltering();

    const cuisineFilters = allFilters.cuisines.join(",");
    const dietFilters = allFilters.diets.join(",");
    const intoleranceFilters = allFilters.intolerances.join(",");
    const ingredientFilters = checkedIngredients.join(",");

    console.log(allFilters);
    if (
      !checkedIngredients.length &&
      !allFilters.cuisines.length &&
      allFilters.diets.length &&
      allFilters.intolerances.length
    )
      return alert("You need to select at least one filtering option.");

    const filteredRecipes: FilteredRecipeType[] = await getFilteredRecipes(
      cuisineFilters,
      dietFilters,
      intoleranceFilters,
      ingredientFilters
    );

    if (!filteredRecipes.length) {
      setRecipesList([]);
      return setShowNoResults(true);
    }

    addFilteredRecipesToRecipesList(filteredRecipes);
  };

  return (
    <div className={styles.recipesFilter}>
      <p className={styles.recipesFilter__title}>Filter Recipes</p>
      <div className={styles.recipesFilter__container}>
        <AsyncSelect
          className={styles.recipesFilter__menu}
          options={cuisinesOptions}
          isMulti
          placeholder="Cuisines"
          value={selectedCuisines}
          onChange={handleCuisinesChange}
        />
        <AsyncSelect
          className={styles.recipesFilter__menu}
          options={intolerancesOptions}
          isMulti
          placeholder="Intolerances"
          value={selectedIntolerances}
          onChange={handleIntolerancesChange}
        />
        <AsyncSelect
          className={styles.recipesFilter__menu}
          options={dietsOptions}
          isMulti
          placeholder="Diets"
          value={selectedDiets}
          onChange={handleDietsChange}
        />
      </div>

      <button className={styles.recipesFilter__btn} onClick={handleClick}>
        Filter
      </button>
    </div>
  );
};

export default RecipesFilter;

// function DropdownMenu(
//   values: unknown,
//   onChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void,
//   placeholder:string,
//   options: {value:string, label:string, isDisabled?: boolean}[]
// ) {
//   return (
//     <AsyncSelect
//       className={styles.recipesFilter__menu}
//       options={options}
//       isMulti
//       placeholder={placeholder}
//       value={values}
//       onChange={onChange}
//     />
//   );
// }
