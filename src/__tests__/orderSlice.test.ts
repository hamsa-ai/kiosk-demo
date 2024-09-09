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

    state.addItemToOrder(burgerItem.id, 1);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentOrder[0]).toEqual({
      id: burgerItem.id,
      name: burgerItem.name,
      price: burgerItem.price,
      quantity: 1,
    });
  });

  /**
   * Scenario: Adding Multiple Items to the Order
   * This test checks that multiple items can be added to the order and are reflected correctly in the state.
   */
  it("should add multiple items to the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(burgerItem.id, 1);
    state.addItemToOrder(friesItem.id, 1);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);
    expect(updatedState.currentOrder[0].name).toBe(burgerItem.name);
    expect(updatedState.currentOrder[1].name).toBe(friesItem.name);
  });

  /**
   * Scenario: Updating the Quantity of an Existing Item
   * This test verifies that adding the same item multiple times correctly updates the quantity in the order.
   */
  it("should update the quantity of an existing item in the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(burgerItem.id, 1);
    state.addItemToOrder(burgerItem.id, 1);

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
    state.addItemToOrder(burgerItem.id, 1);

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

    state.addItemToOrder(burgerItem.id, 1);
    state.addItemToOrder(friesItem.id, 1);

    const summary = state.showOrderSummary();
    expect(summary.items).toHaveLength(2);
    expect(summary.itemsTotal.toString()).toBe("8.48"); // Assuming burger price is 5.99 and fries price is 2.49
  });

  /**
   * Scenario: Completing the Order
   * This test checks that the order is completed correctly, providing an order summary and resetting the order state.
   */
  it("should complete the order", () => {
    const state = getUpdatedState();

    state.addItemToOrder(burgerItem.id, 1);
    state.addItemToOrder(friesItem.id, 1);

    const completedOrder = state.completeOrder();

    const updatedState = getUpdatedState();
    expect(completedOrder.items).toHaveLength(2);
    expect(completedOrder.itemsTotal.toString()).toBe("8.48");
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

    state.addItemToOrder(burgerItem.id, 2);
    state.addItemToOrder(friesItem.id, 3);

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);
    expect(updatedState.currentOrder[0].quantity).toBe(2);
    expect(updatedState.currentOrder[1].quantity).toBe(3);
  });
});
