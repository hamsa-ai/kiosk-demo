import { menuData } from "../menuData";
import type { StateCreator } from "zustand";
import type { ComboStep, Item } from "../types";

/**
 * Interface representing the slice of state related to combo meal management.
 */
export interface ComboSlice {
  currentComboStep: number | null;
  startComboOrder: () => ComboStep | null;
  nextComboStep: () => ComboStep | null;
  previousComboStep: () => ComboStep | null;
  skipComboStep: () => ComboStep | null;
  resetCombo: () => void;
  getItemsForCurrentStep: () => Item[];
}

/**
 * Creates a Zustand slice for managing combo meal selections.
 */
export const createComboSlice: StateCreator<ComboSlice> = (set, get) => ({
  currentComboStep: null,

  // Start the combo order process
  startComboOrder: () => {
    const comboCategory = menuData.categories.find(
      (cat) => cat.id === "combo_meal",
    );

    if (
      !comboCategory ||
      !comboCategory.steps ||
      comboCategory.steps.length === 0
    ) {
      return null; // Return null if comboCategory or steps are undefined or empty
    }

    set({ currentComboStep: 0 });
    return comboCategory.steps[0] || null;
  },

  // Advance to the next step in the combo process
  nextComboStep: () => {
    const comboCategory = menuData.categories.find(
      (cat) => cat.id === "combo_meal",
    );

    if (!comboCategory || !comboCategory.steps) {
      return null; // Return null if comboCategory or steps are undefined
    }

    const steps = comboCategory.steps;
    const currentStepIndex = get().currentComboStep;

    if (currentStepIndex === null || currentStepIndex >= steps.length - 1) {
      set({ currentComboStep: null });
      return null;
    }

    set({ currentComboStep: currentStepIndex + 1 });
    return steps[currentStepIndex + 1] || null;
  },

  // Move back to the previous step in the combo process
  previousComboStep: () => {
    const comboCategory = menuData.categories.find(
      (cat) => cat.id === "combo_meal",
    );

    if (!comboCategory || !comboCategory.steps) {
      return null; // Return null if comboCategory or steps are undefined
    }

    const currentStepIndex = get().currentComboStep;
    if (currentStepIndex !== null && currentStepIndex > 0) {
      set({ currentComboStep: currentStepIndex - 1 });
      return comboCategory.steps[currentStepIndex - 1] || null;
    }
    return null;
  },

  // Skip the current step in the combo process
  skipComboStep: () => {
    const comboCategory = menuData.categories.find(
      (cat) => cat.id === "combo_meal",
    );

    if (!comboCategory || !comboCategory.steps) {
      return null; // Return null if comboCategory or steps are undefined
    }

    const steps = comboCategory.steps;
    const currentStepIndex = get().currentComboStep;

    if (currentStepIndex === null || currentStepIndex >= steps.length - 1) {
      set({ currentComboStep: null });
      return null;
    }

    set({ currentComboStep: currentStepIndex + 1 });
    return steps[currentStepIndex + 1] || null;
  },

  // Reset the combo process
  resetCombo: () => {
    set({ currentComboStep: null });
  },

  // Retrieve the items for the current combo step
  getItemsForCurrentStep: () => {
    const comboCategory = menuData.categories.find(
      (cat) => cat.id === "combo_meal",
    );

    if (!comboCategory || !comboCategory.steps) {
      return []; // Return empty array if comboCategory or steps are undefined
    }

    const currentStepIndex = get().currentComboStep;
    if (currentStepIndex === null) {
      return []; // Return empty array if no current step
    }

    const currentStep = comboCategory.steps[currentStepIndex];
    const stepCategory = menuData.categories.find(
      (cat) => cat.id === currentStep.id,
    );
    return stepCategory?.items || [];
  },
});
