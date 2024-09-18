import styles from "./recipesList.module.scss";
import Image from "next/image";
import { RecipeListType } from "./RecipesSection";

type RecipeCardPropsType = {
  recipe: RecipeListType;
  addToMyRecipes: (id: number) => void;
  showRecipeInfo: (id: number) => void;
};

const RecipeCard = ({
  recipe,
  addToMyRecipes,
  showRecipeInfo,
}: RecipeCardPropsType) => {
  return (
    <li className={styles.recipeCard} key={recipe.id}>
      <div className={styles.recipeCard__image}>
        <Image
          src={recipe.image}
          alt="recipe image"
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            borderRadius: 10,
          }}
          priority={true}
        />
      </div>
      <div className={styles.recipeCard__title}>
        <p>{recipe.title}</p>
      </div>
      <div className={styles.recipeCard__btns}>
        <button
          onClick={() => {
            showRecipeInfo(recipe.id);
          }}
        >
          More
        </button>
        <button
          onClick={() => {
            addToMyRecipes(recipe.id);
          }}
        >
          Add
        </button>
      </div>
    </li>
  );
};

export default RecipeCard;
