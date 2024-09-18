"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type ItemsToBuyContextType = {
  itemsToBuy: any;
  setItemsToBuy: React.Dispatch<React.SetStateAction<any>>;
};

const ItemsToBuyInitialValue: ItemsToBuyContextType = {
  itemsToBuy: [],
  setItemsToBuy: () => {},
};

export const ItemsToBuyContext = createContext<ItemsToBuyContextType>(
  ItemsToBuyInitialValue
);

export function ItemsToBuyProvider({ children }: { children: ReactNode }) {
  const [itemsToBuy, setItemsToBuy] = useState<any>([]);

  return (
    <ItemsToBuyContext.Provider value={{ itemsToBuy, setItemsToBuy }}>
      {children}
    </ItemsToBuyContext.Provider>
  );
}
