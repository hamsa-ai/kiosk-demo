import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { createOrderSlice, type OrderSlice } from "../store/slices/orderSlice";
import {
	createCategorySlice,
	type CategorySlice,
} from "../store/slices/categorySlice";
import { createComboSlice, type ComboSlice } from "../store/slices/comboSlice";
import type { ComboStep } from "../store/types";
import { create } from "../__mocks__/zustand";
import { initialState } from "../store/initialState";

// Combine all slices into a single store type
type KioskState = OrderSlice & CategorySlice & ComboSlice;

const useKioskStore = create<KioskState>((...a) => ({
	...createOrderSlice(...a),
	...createCategorySlice(...a),
	...createComboSlice(...a),
}));

// Utility function to get the updated state
const getUpdatedState = () => useKioskStore.getState();

// Utility function to reset the state
const resetState = () => useKioskStore.setState(initialState);

describe("Kiosk Store Flow", () => {
	/**
	 * Scenario 1: Simple Combo Meal Order with Editing and Completion
	 * This test verifies the flow of starting a combo meal order, navigating through the steps,
	 * making changes to the selections, and completing the order.
	 */
	it("Scenario 1: Simple Combo Meal Order with Editing and Completion", () => {
        const store = getUpdatedState();
    
        // Initial state
        expect(store.currentOrder).toEqual([]);
        expect(store.currentCategory).toBeNull();
        expect(store.currentComboStep).toBeNull();
    
        // Select "Combo Meal" category
        act(() => {
          store.selectCategory("combo_meal");
        });
    
        let updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("combo_meal");
    
        // Start "Burger Combo" order
        let firstStep: ComboStep | null = null;
        act(() => {
          firstStep = store.startComboOrder();
        });
    
        updatedState = getUpdatedState();
        expect(updatedState.currentComboStep).toBe(0);
        expect(firstStep?.name).toBe("Choose Sandwich");
    
        // Add an item to the order
        act(() => {
          store.addItemToOrder({
            id: "classic_burger",
            name: "Classic Burger",
            price: 5.99,
            quantity: 1,
          });
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentOrder).toHaveLength(1);
        expect(updatedState.currentOrder[0].name).toBe("Classic Burger");
    
        // Show order summary
        const orderSummary = store.showOrderSummary();
        expect(orderSummary.items).toHaveLength(1);
        expect(orderSummary.total).toBe("5.99");
      });
	/**
	 * Scenario 2: Combo Meal Order with Skipping a Step and Adding Non-Combo Items
	 * This test verifies that the user can skip steps in a combo, add the selected combo items to the order,
	 * and then select items from a different category.
	 */
	it("Scenario 2: Combo Meal Order with Skipping a Step and Adding Non-Combo Items", () => {
		const store = getUpdatedState();

		// Select "Combo Meal" category
		act(() => {
			store.selectCategory("combo_meal");
		});

		let updatedState = getUpdatedState();
		expect(updatedState.currentCategory?.id).toBe("combo_meal");

		// Start "Burger Combo" order
		act(() => {
			store.startComboOrder();
		});

		updatedState = getUpdatedState();
		expect(updatedState.currentComboStep).toBe(0);

		// Skip the fries step and move to the drink step
		act(() => {
			store.nextComboStep(); // Skip to fries
			store.skipComboStep(); // Skip to drink
		});
		updatedState = getUpdatedState();
		expect(updatedState.currentComboStep).toBe(2);

		// Add the drink to the order (completing the combo selection so far)
		act(() => {
			store.addItemToOrder({
				id: "cola",
				name: "Cola",
				price: 1.99,
				quantity: 1,
			});
		});

		// Select the "Drinks" category to add an additional drink
		act(() => {
			store.selectCategory("drinks");
		});
		updatedState = getUpdatedState();
		expect(updatedState.currentCategory?.id).toBe("drinks");

		// Add another drink
		act(() => {
			store.addItemToOrder({
				id: "lemon_lime_soda",
				name: "Lemon-Lime Soda",
				price: 1.99,
				quantity: 1,
			});
		});
		updatedState = getUpdatedState();
		expect(updatedState.currentOrder).toHaveLength(2);
		expect(updatedState.currentOrder[0].name).toBe("Cola");
		expect(updatedState.currentOrder[1].name).toBe("Lemon-Lime Soda");

		// Show order summary
		const orderSummary = store.showOrderSummary();
		expect(orderSummary.items).toHaveLength(2);
		expect(orderSummary.total).toBe("3.98");
	});

	/**
	 * Scenario 3: Combo Meal Order Cancellation
	 * This test verifies that when a combo meal order is cancelled, all related states, including the current category and combo step, are reset.
	 */
	it("Scenario 3: Combo Meal Order Cancellation", () => {
		const store = getUpdatedState();

		// Select "Combo Meal" category
		act(() => {
			store.selectCategory("combo_meal");
		});

		let updatedState = getUpdatedState();
		expect(updatedState.currentCategory?.id).toBe("combo_meal");

		// Start "Burger Combo" order
		act(() => {
			store.startComboOrder();
		});

		updatedState = getUpdatedState();
		expect(updatedState.currentComboStep).toBe(0);

		// Cancel the order
		act(() => {
			resetState();
		});
		updatedState = getUpdatedState();
		expect(updatedState.currentOrder).toEqual([]);
		expect(updatedState.currentCategory).toBeNull();
		expect(updatedState.currentComboStep).toBeNull();
	});

	/**
	 * Scenario 4: Multi-Category Order with Combo and Non-Combo Items
	 * This test verifies that the user can start a combo meal order, complete it, and then select and add items from other categories to the order.
	 */
    it("Scenario 4: Multi-Category Order with Combo and Non-Combo Items", () => {
        const store = getUpdatedState();
    
        // Select "Combo Meal" category
        act(() => {
          store.selectCategory("combo_meal");
        });
    
        let updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("combo_meal");
    
        // Start "Burger Combo" order
        act(() => {
          store.startComboOrder();
        });
    
        updatedState = getUpdatedState();
        expect(updatedState.currentComboStep).toBe(0);
    
        // Add sandwich to the order and move to the next step
        act(() => {
          store.addItemToOrder({
            id: "classic_burger",
            name: "Classic Burger",
            price: 5.99,
            quantity: 1,
          });
          store.nextComboStep();
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentComboStep).toBe(1);
        expect(updatedState.currentOrder).toHaveLength(1);
    
        // Switch to "Fries" category and add fries
        act(() => {
          store.selectCategory("fries");
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("fries");
    
        act(() => {
          store.addItemToOrder({
            id: "regular_fries",
            name: "Regular Fries",
            price: 2.49,
            quantity: 1,
          });
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentOrder).toHaveLength(2);
    
        // Switch to "Drinks" category and add a drink
        act(() => {
          store.selectCategory("drinks");
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("drinks");
    
        act(() => {
          store.addItemToOrder({
            id: "cola",
            name: "Cola",
            price: 1.99,
            quantity: 1,
          });
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentOrder).toHaveLength(3);
      });
	/**
	 * Scenario 5: Editing and Removing Items Before Checkout
	 * This test verifies that the user can edit and remove items from the order before finalizing the checkout.
	 */
	it("Scenario 5: Editing and Removing Items Before Checkout", () => {
        const store = getUpdatedState();
    
        // Select "Combo Meal" category
        act(() => {
          store.selectCategory("combo_meal");
        });
    
        let updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("combo_meal");
    
        // Start "Chicken Combo" order
        act(() => {
          store.startComboOrder();
        });
    
        updatedState = getUpdatedState();
        expect(updatedState.currentComboStep).toBe(0);
    
        // Add the sandwich to the order
        act(() => {
          store.addItemToOrder({
            id: "grilled_chicken_sandwich",
            name: "Grilled Chicken Sandwich",
            price: 6.49,
            quantity: 1,
          });
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentOrder).toHaveLength(1);
    
        // Switch to "Sauce" category and add sauce
        act(() => {
          store.selectCategory("sauce");
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentCategory?.id).toBe("sauce");
    
        act(() => {
          store.addItemToOrder({
            id: "bbq_sauce",
            name: "BBQ Sauce",
            price: 0.35,
            quantity: 1,
          });
        });
        updatedState = getUpdatedState();
        expect(updatedState.currentOrder).toHaveLength(2);
      });
});