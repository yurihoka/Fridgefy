import { useState } from "react";
import styles from "./recipeItem.module.scss";
import Image from "next/image";
import Trash from "../../../public/trash (1).svg";
import AccordionOpen from "../../../public/accordionopen.png";
import AccordionClose from "../../../public/accordionclose.png";
import { useMyRecipes } from "@/custom_hooks/useMyRecipes";
import { useItemsToBuy } from "@/custom_hooks/useItemsToBuy";

export type Recipe = {
  id: number;
  title: string;
  summary: string;
  image: string;
  extendedIngredients: any[];
};

export default function RecipeItem({
  id,
  title,
  summary,
  image,
  extendedIngredients,
}: Recipe) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteMyRecipes } = useMyRecipes();
  const { setItemsToBuy } = useItemsToBuy();

  return (
    <li className={styles.recipeNames}>
      <div className={styles.heading}>
        <p>{title}</p>
        <div className={styles.icons}>
          <button
            className={styles.button}
            onClick={() => {
              const newIngredients = [...extendedIngredients].map(
                (ingredient) => ingredient.name
              );

              setItemsToBuy(newIngredients);
            }}
          >
            buy
          </button>
          <Image
            src={Trash}
            alt="trash"
            width={22}
            height={22}
            onClick={() => {
              deleteMyRecipes(id);
            }}
          />
          <Image
            src={isOpen ? AccordionOpen : AccordionClose}
            alt={isOpen ? "open" : "close"}
            width={15}
            height={15}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div className={styles.panel}>
          <p
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: summary }}
          />

          <Image
            className={styles.foodImage}
            src={image}
            alt="recipeImage"
            width={275}
            height={300}
          />
        </div>
      )}
    </li>
  );
}
