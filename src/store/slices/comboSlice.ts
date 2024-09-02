import type { StateCreator } from "zustand";
import type { ComboStep } from "../types";
import { menuData } from "../menuData";

/**
 * Interface representing the slice of state related to combo meal management.
 * It contains the current step in the combo process and methods to manage the flow of combo meal selection.
 */
export interface ComboSlice {
	currentComboStep: number | null;
	startComboOrder: (comboId: string) => ComboStep | null;
	nextComboStep: () => ComboStep | null;
	previousComboStep: () => ComboStep | null;
	skipComboStep: () => ComboStep | null;
}

/**
 * Creates a Zustand slice for managing combo meal selections.
 *
 * @param set - Zustand's set function to update the state.
 * @param get - Zustand's get function to retrieve the current state.
 * @returns The ComboSlice containing the state and actions for combo meal management.
 */
export const createComboSlice: StateCreator<ComboSlice> = (set, get) => ({
	currentComboStep: null,

	/**
	 * Starts a combo order by selecting the first step of the combo process.
	 *
	 * @param comboId - The ID of the selected combo meal.
	 * @returns The first ComboStep or null if the combo is not found.
	 */
	startComboOrder: (comboId) => {
		const comboCategory = menuData.categories.find(
			(cat) => cat.id === "combo_meal"
		);

		if (!comboCategory?.steps) {
			return null;
		}

		const combo = comboCategory.items.find((item) => item.id === comboId);

		if (!combo) {
			return null;
		}

		set({ currentComboStep: 0 });

		console.log(`Started combo order: ${combo.name}`);
		return comboCategory.steps[0];
	},

	/**
	 * Advances to the next step in the combo meal selection process.
	 * If the current step is the last step, it completes the combo order.
	 *
	 * @returns The next ComboStep or null if the combo meal selection is complete.
	 */
	nextComboStep: () => {
		const comboCategory = menuData.categories.find(
			(cat) => cat.id === "combo_meal"
		);

		const steps = comboCategory?.steps || [];

		if (!steps.length) {
			return null;
		}

		const currentStepIndex = get().currentComboStep;

		if (currentStepIndex === null || currentStepIndex >= steps.length - 1) {
			// Already at the final step, or no steps left
			console.log("Combo meal selection complete");
			set({ currentComboStep: null });
			return null;
		}

		// Move to the next step
		const nextStep = currentStepIndex + 1;
		set({ currentComboStep: nextStep });
		console.log(`Moving to next combo step: ${steps[nextStep].name}`);
		return steps[nextStep];
	},

	/**
	 * Moves back to the previous step in the combo meal selection process.
	 * If the current step is the first step, it remains at the first step.
	 *
	 * @returns The previous ComboStep or null if the current step is the first step.
	 */
	previousComboStep: () => {
		const comboCategory = menuData.categories.find(
			(cat) => cat.id === "combo_meal"
		);

		if (!comboCategory?.steps) {
			return null;
		}

		const currentStepIndex = get().currentComboStep;

		if (currentStepIndex !== null && currentStepIndex > 0) {
			const prevStep = currentStepIndex - 1;
			set({ currentComboStep: prevStep });
			console.log("Moving back to previous combo step");
			return comboCategory.steps[prevStep];
		}

		return null;
	},

	/**
	 * Skips the current step in the combo meal selection process and moves to the next step.
	 * If the current step is the last step, it completes the combo order.
	 *
	 * @returns The next ComboStep or null if the combo meal selection is complete.
	 */
	skipComboStep: () => {
		const comboCategory = menuData.categories.find(
			(category) => category.id === "combo_meal"
		);

		if (!comboCategory?.steps) {
			return null;
		}

		const steps = comboCategory?.steps || [];
		const currentStepIndex = get().currentComboStep;

		if (currentStepIndex === null || currentStepIndex >= steps.length - 1) {
			// Already at the final step, or no steps left
			console.log("Combo meal selection complete");
			set({ currentComboStep: null });
			return null;
		}

		// Skip to the next step
		const nextStep = currentStepIndex + 1;
		set({ currentComboStep: nextStep });
		console.log("Skipping current combo step");
		return steps[nextStep];
	},
});
