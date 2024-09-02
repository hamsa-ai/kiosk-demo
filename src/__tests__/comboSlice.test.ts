import { describe, it, expect } from "vitest";
import { create } from "../__mocks__/zustand";
import { createComboSlice, type ComboSlice } from "../store/slices/comboSlice";
import { menuData } from "../store/menuData"; // Assuming menuData is imported for reference

type TestStore = ComboSlice;

const useComboStore = create<TestStore>((...a) => ({
	...createComboSlice(...a),
}));

// Utility function to get the updated state
const getUpdatedState = () => useComboStore.getState();

describe("ComboSlice", () => {
	/**
	 * Scenario: Starting a Combo Order
	 * This test verifies that a combo order starts at step 0 and the first step is correctly identified.
	 */
	it("should start a combo order at step 0", () => {
		const store = getUpdatedState();

		// Start combo order
		const firstStep = store.startComboOrder("burger_combo");
		const updatedState = getUpdatedState();

		expect(updatedState.currentComboStep).toBe(0); // Step 0 corresponds to the first step
		expect(firstStep?.name).toBe("Sandwich");
	});

	/**
	 * Scenario: Moving to the Next Combo Step
	 * This test checks the transition from step 0 to step 1 in the combo order process.
	 */
	it("should move to the next combo step (from step 0 to step 1)", () => {
		const store = getUpdatedState();

		// Start combo order
		store.startComboOrder("burger_combo");

		// Move to the next step
		const secondStep = store.nextComboStep();
		const updatedState = getUpdatedState();

		expect(updatedState.currentComboStep).toBe(1); // Now at step 1
		expect(secondStep?.name).toBe("Fries");
	});

	/**
	 * Scenario: Completing a Combo Order
	 * This test ensures that after all steps are completed, the combo order is correctly marked as completed.
	 */
	it("should complete the combo order after all steps", () => {
		const store = getUpdatedState();

		// Start combo order
		store.startComboOrder("burger_combo");

		// Move through all steps
		store.nextComboStep(); // Move to step 1
		store.nextComboStep(); // Move to step 2 (last step)
		const updatedStateAfterLastStep = getUpdatedState();

		expect(updatedStateAfterLastStep.currentComboStep).toBe(2); // Final step before completion

		// Move to complete the combo
		const thirdStep = store.nextComboStep(); // Should complete
		const finalState = getUpdatedState();

		expect(finalState.currentComboStep).toBeNull(); // Combo should be completed
		expect(thirdStep).toBeNull(); // No more steps
	});

	/**
	 * Scenario: Starting a Combo Order for a Different Combo
	 * This test verifies that starting a different combo order correctly resets the combo step and returns the first step.
	 */
	it("should start a different combo order and reset the combo step", () => {
		const store = getUpdatedState();

		// Start the first combo order
		store.startComboOrder("burger_combo");
		store.nextComboStep(); // Move to step 1

		// Start a different combo order
		const firstStepChickenCombo = store.startComboOrder("chicken_combo");
		const updatedState = getUpdatedState();

		expect(updatedState.currentComboStep).toBe(0); // Reset to step 0
		expect(firstStepChickenCombo?.name).toBe("Sandwich");
	});

	/**
	 * Scenario: Handling Invalid Combo ID
	 * This test ensures that providing an invalid combo ID does not update the state and returns null.
	 */
	it("should return null and not change state if combo ID is invalid", () => {
		const store = getUpdatedState();

		// Attempt to start an invalid combo order
		const invalidCombo = store.startComboOrder("invalid_combo_id");
		const updatedState = getUpdatedState();

		expect(invalidCombo).toBeNull(); // Invalid combo should return null
		expect(updatedState.currentComboStep).toBeNull(); // State should not change
	});

	/**
	 * Scenario: Attempting to Move Beyond the Final Step
	 * This test verifies that attempting to move beyond the final combo step does not cause errors and correctly keeps the state.
	 */
	it("should not move beyond the final combo step", () => {
		const store = getUpdatedState();

		// Start combo order
		store.startComboOrder("burger_combo");

		// Move through all steps
		store.nextComboStep(); // Move to step 1
		store.nextComboStep(); // Move to step 2 (last step)
		store.nextComboStep(); // Move to complete the combo

		// Attempt to move beyond the final step
		const invalidStep = store.nextComboStep();
		const finalState = getUpdatedState();

		expect(finalState.currentComboStep).toBeNull(); // Should remain null after completion
		expect(invalidStep).toBeNull(); // No further steps should be available
	});
});
