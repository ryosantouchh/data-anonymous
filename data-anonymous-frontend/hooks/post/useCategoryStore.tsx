import { create } from "zustand";

interface CategoryState {
  categories: Array<Record<string, unknown>>;
  setCategories: (fetchedCategories: Array<Record<string, unknown>>) => void;
  clearCategories: () => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (fetchedCategories) =>
    set(() => ({ categories: fetchedCategories })),
  clearCategories: () => set(() => ({ categories: [] })),
}));

export default useCategoryStore;
