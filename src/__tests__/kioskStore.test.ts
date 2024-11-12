import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { createOrderSlice, type OrderSlice } from "../store/slices/orderSlice";
import {
  createCategorySlice,
  type CategorySlice,
} from "../store/slices/categorySlice";
import { create } from "../__mocks__/zustand";
import { initialState } from "../store/initialState";
import { getMenuItemObject } from "@/lib/utils";

// Combine all slices into a single store type
type KioskState = OrderSlice & CategorySlice;

const useKioskStore = create<KioskState>((...a) => ({
  ...createOrderSlice(...a),
  ...createCategorySlice(...a),
}));

// Utility function to get the updated state
const getUpdatedState = () => useKioskStore.getState();

// Utility function to reset the state
const resetState = () => useKioskStore.setState(initialState);

const beefBurgerItem = getMenuItemObject("beef_burger") || {
  id: "beef_burger",
  name: "Beef Burger",
  price: 5.5,
};

const frenchFriesItem = getMenuItemObject("french_fries") || {
  id: "french_fries",
  name: "French Fries",
  price: 2.5,
};

const cocaColaItem = getMenuItemObject("coca_cola") || {
  id: "coca_cola",
  name: "Coca Cola",
  price: 1.5,
};

const moltenCakeItem = getMenuItemObject("molten_cake") || {
  id: "molten_cake",
  name: "Molten Cake",
  price: 3.5,
};
describe("Kiosk Store Flow", () => {
  /**
   * Scenario 1: Simple Order with Editing and Completion
   * This test verifies the flow of starting an order, adding items, making changes to the selections,
   * and completing the order.
   */
  it("Scenario 1: Simple Order with Editing and Completion", () => {
    const store = getUpdatedState();

    // Initial state
    expect(store.currentOrder).toEqual([]);
    expect(store.currentCategory).toBeNull();

    // Select "Burgers" category
    act(() => {
      store.selectCategory("burgers");
    });

    let updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("burgers");

    // Add an item to the order
    act(() => {
      store.addItemToOrder(beefBurgerItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentOrder[0].name).toBe(beefBurgerItem.name);

    // Show order summary
    const orderSummary = store.showOrderSummary();
    expect(orderSummary.items).toHaveLength(1);
    expect(orderSummary.itemsTotal.toString()).toBe(
      beefBurgerItem.price.toString(),
    );
  });

  /**
   * Scenario 2: Multi-Category Order with Additional Items
   * This test verifies that the user can select items from different categories.
   */
  it("Scenario 2: Multi-Category Order with Additional Items", () => {
    const store = getUpdatedState();

    // Select "Burgers" category
    act(() => {
      store.selectCategory("burgers");
    });

    let updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("burgers");

    // Add Beef Burger to the order
    act(() => {
      store.addItemToOrder(beefBurgerItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);

    // Switch to "Appetizers" category and add French Fries
    act(() => {
      store.selectCategory("appetizers");
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("appetizers");

    act(() => {
      store.addItemToOrder(frenchFriesItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);

    // Switch to "Beverages" category and add Coca Cola
    act(() => {
      store.selectCategory("beverages");
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("beverages");

    act(() => {
      store.addItemToOrder(cocaColaItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(3);
  });

  /**
   * Scenario 3: Editing and Removing Items Before Checkout
   * This test verifies that the user can edit and remove items from the order before finalizing the checkout.
   */
  it("Scenario 3: Editing and Removing Items Before Checkout", () => {
    const store = getUpdatedState();

    // Select "Desserts" category
    act(() => {
      store.selectCategory("desserts");
    });

    let updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("desserts");

    // Add Molten Cake to the order
    act(() => {
      store.addItemToOrder(moltenCakeItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);

    // Switch to "Appetizers" category and add French Fries
    act(() => {
      store.selectCategory("appetizers");
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("appetizers");

    act(() => {
      store.addItemToOrder(frenchFriesItem.id, 1);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(2);

    // Edit Molten Cake quantity
    act(() => {
      store.editItemInOrder(moltenCakeItem.id, 2);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder[1].quantity).toBe(2);

    // Remove French Fries from the order
    act(() => {
      store.removeItemFromOrder(frenchFriesItem.id);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
  });

  /**
   * Scenario 4: Adding multiple quantities of the same item
   * This test ensures that adding multiple quantities of the same item updates the order correctly.
   */
  it("Scenario 4: Adding multiple quantities of the same item", () => {
    const store = getUpdatedState();

    // Select "Burgers" category
    act(() => {
      store.selectCategory("burgers");
    });

    let updatedState = getUpdatedState();
    expect(updatedState.currentCategory?.id).toBe("burgers");

    // Add Beef Burger with quantity 3
    act(() => {
      store.addItemToOrder(beefBurgerItem.id, 3);
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentOrder[0].quantity).toBe(3);
    expect(updatedState.currentOrder[0].name).toBe(beefBurgerItem.name);
  });

  /**
   * Scenario 5: Handling non-existent items
   * This test verifies that the store handles adding non-existent items gracefully.
   */
  it("Scenario 5: Handling non-existent items", () => {
    const store = getUpdatedState();

    // Try to add an item that doesn't exist and expect an error
    expect(() => {
      act(() => {
        store.addItemToOrder("non_existent_item", 1);
      });
    }).toThrow("Error: Item with id non_existent_item not found.");

    const updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toEqual([]); // No items should be added
  });

  /**
   * Scenario 6: Handling negative or zero quantity
   * This test verifies that adding items with zero or negative quantities does not update the order.
   */
  it("Scenario 6: Handling negative or zero quantity", () => {
    const store = getUpdatedState();

    // Select "Burgers" category
    act(() => {
      store.selectCategory("burgers");
    });

    // Try to add an item with zero quantity and expect an error
    expect(() => {
      act(() => {
        store.addItemToOrder(beefBurgerItem.id, 0);
      });
    }).toThrow("Error: Quantity must be greater than 0.");

    let updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toEqual([]); // No item should be added

    // Try to add an item with negative quantity and expect an error
    expect(() => {
      act(() => {
        store.addItemToOrder(beefBurgerItem.id, -2);
      });
    }).toThrow("Error: Quantity must be greater than 0.");

    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toEqual([]); // No item should be added
  });

  /**
   * Scenario 7: Resetting the order state
   * This test verifies that resetting the state clears the current order and category selection.
   */
  it("Scenario 7: Resetting the order state", () => {
    const store = getUpdatedState();

    // Select "Burgers" category and add Beef Burger
    act(() => {
      store.selectCategory("burgers");
      store.addItemToOrder(beefBurgerItem.id, 1);
    });

    let updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toHaveLength(1);
    expect(updatedState.currentCategory?.id).toBe("burgers");

    // Reset the state
    act(() => {
      resetState();
    });
    updatedState = getUpdatedState();
    expect(updatedState.currentOrder).toEqual([]);
    expect(updatedState.currentCategory).toBeNull();
  });
});
