import { describe, it, expect } from "vitest";
import { create } from "../__mocks__/zustand";
import { createOrderSlice, type OrderSlice } from "../store/slices/orderSlice";
import { getMenuItemObject } from "@/lib/utils";

/**
 * Type definition for the test store, derived from the OrderSlice type.
 */
type TestStore = OrderSlice;

/**
 * Creates a Zustand store for testing purposes using the OrderSlice.
 * The created store provides state management functionality for handling orders.
 */
const useOrderStore = create<TestStore>((...a) => ({
  ...createOrderSlice(...a),
}));

/**
 * Utility function to retrieve the updated state of the order.
 * This function simplifies accessing the current state in each test.
 */
const getUpdatedState = () => useOrderStore.getState();

describe("OrderSlice", () => {
  const beefBurgerItem = getMenuItemObject("beef_burger") || {
    id: "beef_burger",
    name: "Beef Burger",
    price: 5.5,
    calories: 450,
  };
  const frenchFriesItem = getMenuItemObject("french_fries") || {
    id: "french_fries",
    name: "French Fries",
    price: 2.5,
    calories: 200,
  };

  /**
   * Scenario: Verifying Initial State
   * This test checks that the initial state of the order is an empty array.
   */
  it("should have initial state", () => {
    const state = getUpdatedState();
    expect(state.currentOrder).toEqual([]);
  });

  /**
   * Scenario: Adding a Single Item to the Order
   * This test verifies that an item can be added to the order, and it appears correctly in the state.
   */
  it("should add an item to the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1);

    const updatedState = getUpdatedState();
    console.log("updatedState :", updatedState);
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentOrder[0]).toEqual({
      id: beefBurgerItem.id,
      name: beefBurgerItem.name,
      price: beefBurgerItem.price,
      quantity: 1,
      calories: beefBurgerItem.calories,
    });
  });

  /**
   * Scenario: Adding Multiple Items to the Order
   * This test checks that multiple items can be added to the order and are reflected correctly in the state.
   */
  it("should add multiple items to the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1);
    state.addItemToOrder(frenchFriesItem.id, 1);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);
    expect(updatedState.currentOrder[1].name).toBe(beefBurgerItem.name);
    expect(updatedState.currentOrder[0].name).toBe(frenchFriesItem.name);
  });

  /**
   * Scenario: Updating the Quantity of an Existing Item
   * This test verifies that adding the same item multiple times correctly updates the quantity in the order.
   */
  it("should update the quantity of an existing item in the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1);
    state.addItemToOrder(beefBurgerItem.id, 1);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentOrder[0].quantity).toBe(2);
  });

  /**
   * Scenario: Resetting the Order After Cancellation
   * This test checks that the order is reset to an empty state when the order is canceled.
   */
  it("should reset order when canceled", () => {
    const state = getUpdatedState();
    state.addItemToOrder(beefBurgerItem.id, 1);

    state.cancelOrder();

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toEqual([]);
  });

  /**
   * Scenario: Generating an Order Summary
   * This test verifies that the order summary correctly reflects the items in the order and calculates the total price.
   */
  it("should show order summary", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1);
    state.addItemToOrder(frenchFriesItem.id, 1);

    const summary = state.showOrderSummary();
    expect(summary.items).toHaveLength(2);
    expect(summary.itemsTotal.toString()).toBe("8"); // Assuming burger price is 5.99 and fries price is 2.49
  });

  /**
   * Scenario: Completing the Order
   * This test checks that the order is completed correctly, providing an order summary and resetting the order state.
   */
  it("should complete the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1);
    state.addItemToOrder(frenchFriesItem.id, 1);

    const completedOrder = state.completeOrder();

    const updatedState = getUpdatedState();
    expect(completedOrder.items).toHaveLength(2);
    expect(completedOrder.itemsTotal.toString()).toBe("8");
    expect(updatedState.currentOrder).toEqual([]);
  });

  /**
   * Scenario: Handling an Empty Order
   * This test verifies that an empty order is handled correctly, both when showing the summary and completing the order.
   */
  it("should handle an empty order correctly", () => {
    const state = getUpdatedState();

    const summary = state.showOrderSummary();
    expect(summary.items).toHaveLength(0);
    expect(summary.itemsTotal).toBe(0);

    const completedOrder = state.completeOrder();
    expect(completedOrder.items).toHaveLength(0);
    expect(completedOrder.itemsTotal).toBe(0);
  });

  /**
   * Scenario: Adding Items with Different Quantities
   * This test checks that items can be added with different quantities and that these quantities are correctly tracked.
   */
  it("should add items with different quantities", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 2);
    state.addItemToOrder(frenchFriesItem.id, 3);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);
    expect(updatedState.currentOrder[1].quantity).toBe(2);
    expect(updatedState.currentOrder[0].quantity).toBe(3);
  });
  /**
   * Scenario: Removing Item when Quantity is Set to 0
   * This test checks that the item is removed from the order when its quantity is set to 0.
   */
  it("should remove item when quantity is set to 0", () => {
    const state = getUpdatedState();

    state.addItemToOrder(beefBurgerItem.id, 1); // Add the item first
    state.addItemToOrder(beefBurgerItem.id, 0); // Now set quantity to 0

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(0); // The item should be removed
  });
});
