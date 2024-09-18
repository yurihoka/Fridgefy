import { Dispatch, SetStateAction } from "react";
import styles from "./recipesList.module.scss";
import Image from "next/image";

type ModalRecipeInfoPropsType = {
  recipeInfo: { id: number; title: string; image: string; summary: string };
  recipeInfoOpen: boolean;
  setRecipeInfoOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalRecipeInfo = ({
  recipeInfo,
  recipeInfoOpen,
  setRecipeInfoOpen,
}: ModalRecipeInfoPropsType) => {
  return (
    <div className={styles.recipeInfo}>
      <div className={styles.recipeInfo__container}>
        <div className={styles.recipeInfo__image}>
          <Image
            src={recipeInfo.image}
            alt="recipe image"
            fill
            sizes="100%"
            style={{
              objectFit: "contain",
              borderRadius: 10,
            }}
            priority={true}
          />
        </div>
        <div className={styles.recipeInfo__title}>
          <p>{recipeInfo.title}</p>
        </div>
        <div className={styles.recipeInfo__summary}>
          <p dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}></p>
        </div>
        <button
          className={styles.recipeInfo__closeBtn}
          onClick={() => {
            setRecipeInfoOpen(!recipeInfoOpen);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ModalRecipeInfo;
