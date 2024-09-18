export const useRecipeInfo = () => {
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string;

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

  return { getRecipeInfo };
};
