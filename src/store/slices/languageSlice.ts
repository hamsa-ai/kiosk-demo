import type { StateCreator } from "zustand";

/**
 * Interface representing the slice of state related to language management.
 */
export interface LanguageSlice {
  selectedLanguage: "ar" | "en";
  selectLanguage: (language: "ar" | "en") => void;
  resetLanguage: () => void; // Action to reset the language to the default
}

/**
 * Creates a Zustand slice for managing language selection.
 *
 * @param set - Zustand's set function to update the state.
 * @returns The LanguageSlice containing the state and actions for language management.
 */
export const createLanguageSlice: StateCreator<LanguageSlice> = (set) => ({
  // Default language is set to English
  selectedLanguage: "en",

  /**
   * Selects a language and updates the selectedLanguage state.
   *
   * @param language - The language to select ("ar" or "en").
   */
  selectLanguage: (language) => {
    set({ selectedLanguage: language });
  },

  /**
   * Resets the selected language to the default value ("en").
   */
  resetLanguage: () => {
    set({ selectedLanguage: "en" });
  },
});
