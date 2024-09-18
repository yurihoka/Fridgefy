import RecipeItem, { Recipe } from "./RecipeItem";

export default function Accordion({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          summary={recipe.summary}
          image={recipe.image}
          extendedIngredients={recipe.extendedIngredients}
        />
      ))}
    </ul>
  );
}
