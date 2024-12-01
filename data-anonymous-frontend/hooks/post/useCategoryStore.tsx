import { TCategory } from "@/types";
import { create } from "zustand";

interface CategoryState {
  categories: Array<TCategory>;
  setCategories: (fetchedCategories: Array<TCategory>) => void;
  clearCategories: () => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (fetchedCategories) =>
    set(() => ({ categories: fetchedCategories })),
  clearCategories: () => set(() => ({ categories: [] })),
}));

export default useCategoryStore;
