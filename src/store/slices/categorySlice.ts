import type { StateCreator } from "zustand";
import type { Category } from "../types";
import { menuData } from "../menuData";

/**
 * Interface representing the slice of state related to category management.
 */
export interface CategorySlice {
  currentCategory: Category | null;
  selectCategory: (categoryId: string) => Category | null;
  removeCategory: () => void; // New action to remove category
}

/**
 * Creates a Zustand slice for managing category selection.
 *
 * @param set - Zustand's set function to update the state.
 * @returns The CategorySlice containing the state and actions for category management.
 */
export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  currentCategory: null,

  /**
   * Selects a category by its ID and updates the current category state.
   *
   * @param categoryId - The ID of the category to select.
   * @returns The selected Category or null if not found.
   */
  selectCategory: (categoryId) => {
    console.log("categoryId :", categoryId);
    const category =
      menuData.categories.find((cat) => cat.id === categoryId) || null;

    set({ currentCategory: category });

    return category;
  },

  /**
   * Removes the current category selection, effectively resetting to the initial state.
   */
  removeCategory: () => {
    set({ currentCategory: null });
  },
});
