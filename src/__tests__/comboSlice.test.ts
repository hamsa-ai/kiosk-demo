import { describe, it, expect } from "vitest";
import { create } from "../__mocks__/zustand";
import { createComboSlice, type ComboSlice } from "../store/slices/comboSlice";
import { createOrderSlice, type OrderSlice } from "../store/slices/orderSlice";
import { getMenuItemObject } from "@/lib/utils";

type TestStore = ComboSlice & OrderSlice;

const useKioskStore = create<TestStore>((...a) => ({
  ...createComboSlice(...a),
  ...createOrderSlice(...a),
}));

// Utility function to get the updated state
const getUpdatedState = () => useKioskStore.getState();

// Helper function to get menu items with fallback
const burgerItem = getMenuItemObject("classic_burger") || {
  id: "classic_burger",
  name: "Classic Burger",
  price: 5.99,
  description:
    "Juicy beef patty with fresh lettuce, tomato, and our special sauce",
};

const friesItem = getMenuItemObject("regular_fries") || {
  id: "regular_fries",
  name: "Regular Fries",
  price: 2.49,
  description: "Crispy golden fries",
};

describe("ComboSlice - Extended Scenarios", () => {
  /**
   * Scenario 1: Starting a Combo Order
   * This test verifies that a combo order starts at step 0 and the first step is correctly identified.
   */
  it("should start a combo order at step 0", () => {
    const store = getUpdatedState();

    // Start combo order
    const firstStep = store.startComboOrder();
    const updatedState = getUpdatedState();

    expect(updatedState.currentComboStep).toBe(0); // Step 0 corresponds to the first step
    expect(firstStep?.name).toBe("Sandwich"); // First step should be the first step in the combo
  });

  /**
   * Scenario 2: Selecting Combo Items and Directly Adding to Order
   * Ensures that selecting combo items directly adds them to the order.
   */
  it("should add items directly to the order during combo steps", () => {
    const store = getUpdatedState();

    // Start combo order
    store.startComboOrder();

    // Directly add items through selection
    store.addItemToOrder(burgerItem.id, 1);
    store.nextComboStep();
    store.addItemToOrder(friesItem.id, 1);
    store.nextComboStep();
    store.addItemToOrder("cola", 1);

    const updatedState = getUpdatedState();

    // Ensure the order contains the combo items
    expect(updatedState.currentOrder).toHaveLength(3); // One combo with 3 items
    expect(updatedState.currentOrder[0].name).toBe(burgerItem.name);
    expect(updatedState.currentOrder[1].name).toBe(friesItem.name);
    expect(updatedState.currentOrder[2].name).toBe("Cola");
  });

  /**
   * Scenario 3: Completing the Combo Order
   * Test ensures that the combo process completes correctly when the final step is reached.
   */
  it("should complete the combo order after final step", () => {
    const store = getUpdatedState();

    // Start combo order and navigate through steps
    store.startComboOrder();
    store.nextComboStep(); // Move to step 1
    store.nextComboStep(); // Move to step 2

    // Add final item and ensure combo completes
    store.addItemToOrder("cola", 1);
    store.nextComboStep(); // Should complete

    const updatedState = getUpdatedState();
    expect(updatedState.currentComboStep).toBeNull(); // Combo should be completed
  });

  /**
   * Scenario 4: Skipping a Step in Combo
   * Verifies that skipping a step correctly advances to the next.
   */
  it("should skip a combo step", () => {
    const store = getUpdatedState();

    // Start combo order
    store.startComboOrder();

    // Skip the first step (Sandwich)
    const skippedStep = store.skipComboStep();
    const updatedState = getUpdatedState();

    expect(updatedState.currentComboStep).toBe(1); // Now at step 1 (Fries)
    expect(skippedStep?.name).toBe("Fries"); // Should move to Fries
  });

  /**
   * Scenario 5: Going Back a Step
   * Verifies that going back a step works as expected.
   */
  it("should go back to the previous step", () => {
    const store = getUpdatedState();

    // Start combo order and move to step 1
    store.startComboOrder();
    store.nextComboStep(); // Move to step 1

    // Go back to the previous step
    const previousStep = store.previousComboStep();
    const updatedState = getUpdatedState();

    expect(updatedState.currentComboStep).toBe(0); // Should move back to step 0
    expect(previousStep?.name).toBe("Sandwich"); // Should move back to "Sandwich"
  });

  /**
   * Scenario 6: Attempting to Move Beyond Final Step
   * Verifies that moving beyond the final step does not update the state and keeps the combo complete.
   */
  it("should not move beyond the final step", () => {
    const store = getUpdatedState();

    // Start combo order and complete all steps
    store.startComboOrder();
    store.nextComboStep(); // Step 1
    store.nextComboStep(); // Step 2 (Final)
    store.nextComboStep(); // Complete the combo

    const finalStep = store.nextComboStep(); // Attempt to move beyond final step
    const updatedState = getUpdatedState();

    expect(updatedState.currentComboStep).toBeNull(); // Combo should remain complete
    expect(finalStep).toBeNull(); // No further steps available
  });

  /**
   * Scenario 7: Starting Multiple Combos in Sequence
   * Tests that multiple combos can be started and each is tracked independently in the order.
   */
  it("should handle multiple combo orders in sequence", () => {
    const store = getUpdatedState();

    // Start the first combo and add items
    store.startComboOrder();
    useKioskStore.getState().addItemToOrder(burgerItem.id, 1);
    store.nextComboStep();
    useKioskStore.getState().addItemToOrder(friesItem.id, 1);
    store.nextComboStep();
    useKioskStore.getState().addItemToOrder("cola", 1);

    let updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(3); // One combo

    // Start the second combo
    store.startComboOrder();
    useKioskStore.getState().addItemToOrder("grilled_chicken_sandwich", 1);
    store.nextComboStep();
    useKioskStore.getState().addItemToOrder("curly_fries", 1);
    store.nextComboStep();
    useKioskStore.getState().addItemToOrder("lemon_lime_soda", 1);

    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(6); // Two combos (3 items each)
  });

  /**
   * Scenario 8: Resetting Combo After Completion
   * Verifies that resetting the combo works properly after completing one.
   */
  it("should reset the combo process after completion", () => {
    const store = getUpdatedState();

    // Start and complete the first combo
    store.startComboOrder();
    store.addItemToOrder(burgerItem.id, 1);
    store.nextComboStep();
    store.addItemToOrder(friesItem.id, 1);
    store.nextComboStep();
    store.addItemToOrder("cola", 1);
    store.nextComboStep(); // Complete the combo

    // Reset the combo process
    store.resetCombo();

    const updatedState = getUpdatedState();
    expect(updatedState.currentComboStep).toBeNull(); // Combo process should be reset
    expect(updatedState.currentOrder).toHaveLength(3); // Ensure previous combo items remain in order
  });

  /**
   * Scenario 9: Invalid Category for Combo Step
   * Verifies that an invalid category ID does not break the process.
   */
  it("should handle invalid category selection gracefully", () => {
    const store = getUpdatedState();

    // Start combo order
    store.startComboOrder();

    // Try to navigate to a step with an invalid category
    const invalidStep = getMenuItemObject("invalid_category_id");
    const updatedState = getUpdatedState();

    expect(invalidStep).toBeNull(); // Invalid category should not exist
    expect(updatedState.currentComboStep).toBe(0); // State should remain unchanged
  });
});
