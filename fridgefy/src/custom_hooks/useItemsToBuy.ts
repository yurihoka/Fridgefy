import { useContext } from "react";
import { ItemsToBuyContext } from "@/contexts/ItemsToBuyContext";

// 3-1. create a custom hook to prevent the shared value from being undefined to let other components have access to the shared value
export const useItemsToBuy = () => {
  const itemsToBuy = useContext(ItemsToBuyContext);

  if (!itemsToBuy) {
    throw new Error("useItemsToBuy must be used with a ItemsToBuyContext.");
  }

  return itemsToBuy;
};
