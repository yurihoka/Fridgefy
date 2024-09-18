import styles from "./myRecipes.module.scss";
import Image from "next/image";

type MyRecipesPropsType = {
  myRecipes: any[];
  deleteRecipe: (id: number) => void;
};

const MyRecipes = ({ myRecipes, deleteRecipe }: MyRecipesPropsType) => {
  return (
    <div className={styles.myRecipes}>
      <p className={styles.myRecipes__title}>My Recipes</p>
      <ul className={styles.myRecipes__addedRecipes}>
        {myRecipes.map((recipe) => (
          <li key={recipe.id} className={styles.myRecipes__addedRecipe}>
            <p>{recipe.title}</p>
            <div
              className={styles.myRecipes__deleteIcon}
              onClick={() => {
                deleteRecipe(recipe.id);
              }}
            >
              <Image
                alt="delete icon"
                src="/trash (1).svg"
                width={20}
                height={20}
                priority={true}
              />
            </div>
            {/* <button
              onClick={() => {
                deleteRecipe(recipe.id);
              }}
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
