import styles from "./ingredientItems.module.scss";
import Image from "next/image";

export type IngredientType = {
  name: string;
  checked: boolean;
};

type IngredientItemsPropsType = {
  ingredients: IngredientType[];
  toggleIngredient: (name: string) => void;
  deleteIngredient: (name: string) => void;
};

const IngredientItems = ({
  ingredients,
  toggleIngredient,
  deleteIngredient,
}: IngredientItemsPropsType) => {
  return (
    <ul className={styles.fridge__addedIngredients}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.name} className={styles.fridge__addedIngredient}>
          <input
            type="checkbox"
            checked={ingredient.checked}
            onChange={() => toggleIngredient(ingredient.name)}
          />
          <p>{ingredient.name}</p>
          <div
            className={styles.fridge__deleteIcon}
            onClick={() => deleteIngredient(ingredient.name)}
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
            className={styles.fridge__deleteIcon}
            onClick={() => deleteIngredient(ingredient.name)}
          >
            Delete
          </button> */}
        </li>
      ))}
    </ul>
  );
};

export default IngredientItems;
