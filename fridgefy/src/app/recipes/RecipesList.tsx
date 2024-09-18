import { useState } from "react";
import styles from "./recipesList.module.scss";
import { RecipeListType } from "./RecipesSection";
import Image from "next/image";
import RecipeCard from "./RecipeCard";

type RecipesListPropsType = {
  recipesList: RecipeListType[];
  addToMyRecipes: (id: number) => void;
  showRecipeInfo: (id: number) => void;
  showNoResults: boolean;
};

const RecipesList = ({
  recipesList,
  addToMyRecipes,
  showRecipeInfo,
  showNoResults,
}: RecipesListPropsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 6;
  const totalRecipesToList = recipesList.length;
  const totalPages = Math.ceil(recipesList.length / recipesPerPage);

  // Calculate index of first and last recipe on current page
  const indexOfLastRecipe =
    totalRecipesToList < recipesPerPage
      ? totalRecipesToList
      : currentPage * recipesPerPage;
  const indexOfFirstRecipe =
    totalRecipesToList < recipesPerPage
      ? 0
      : indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesList.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.recipesList}>
      <ul className={styles.recipesList__container}>
        {!showNoResults ? (
          currentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              addToMyRecipes={addToMyRecipes}
              showRecipeInfo={showRecipeInfo}
            />
          ))
        ) : (
          <div className={styles.recipesList__noResults}>
            <h1>No recipes were found</h1>
            <br />
            <ul>
              <li>Try a more generic filtering</li>
              <li>Try other filtering options</li>
            </ul>
          </div>
        )}
      </ul>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pagination__changePageBtn}
        >
          {"<<"}
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={
              currentPage === index + 1
                ? styles.pagination__activePageBtn
                : styles.pagination__pageBtn
            }
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pagination__changePageBtn}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default RecipesList;
