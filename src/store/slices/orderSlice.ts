import { getMenuItemObject } from "@/lib/utils";
import type { StateCreator } from "zustand";
import type { Item } from "../types";

/**
 * Represents an item in the order.
 */
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  calories: number;
}

export interface OrderSummary {
  items: OrderItem[];
  itemsTotal: number;
  deliveryCost: number;
  total: number;
}

/**
 * Interface representing the slice of state related to order management.
 */
export interface OrderSlice {
  currentOrder: OrderItem[];
  isCompleted: boolean;
  cloneItem: Item | null;

  /**
   * Adds an item to the current order.
   *
   * @param itemId - The ID of the item to add.
   * @param quantity - The quantity of the item to add.
   */
  addItemToOrder: (itemId: string, quantity: number) => void;

  /**
   * Sets the clone item for animations or UI purposes.
   *
   * @param item - The item to clone or null to clear the clone.
   */
  setCloneItem: (item: Item | null) => void;

  /**
   * Edits the quantity of an existing item in the order.
   *
   * @param itemId - The ID of the item to edit.
   * @param quantity - The new quantity to set.
   */
  editItemInOrder: (itemId: string, quantity: number) => void;

  /**
   * Removes an item from the current order by its ID.
   *
   * @param itemId - The ID of the item to remove.
   */
  removeItemFromOrder: (itemId: string) => void;

  /**
   * Generates a summary of the current order, including the total price.
   *
   * @returns An object containing the items in the current order and the total price and delivery cost.
   */
  showOrderSummary: () => OrderSummary;

  /**
   * Completes the current order, sets the isCompleted flag, and resets the order state.
   *
   * @returns An object containing the items in the completed order and the total price and delivery cost.
   */
  completeOrder: () => OrderSummary;

  /**
   * Cancels the current order and resets the order state.
   */
  cancelOrder: () => void;

  /**
   * Resets the order and sets isCompleted to false.
   */
  resetOrder: () => void;
}

/**
 * Creates a Zustand slice for managing the current order.
 *
 * @param set - Zustand's set function to update the state.
 * @param get - Zustand's get function to retrieve the current state.
 * @returns The OrderSlice containing the state and actions for order management.
 */
export const createOrderSlice: StateCreator<OrderSlice> = (set, get) => ({
  currentOrder: [],
  isCompleted: false,
  cloneItem: null,

  /**
   * Adds an item to the current order. If the item already exists in the order, it updates the quantity.
   *
   * @param itemId - The ID of the item to add.
   * @param quantity - The quantity to add.
   */
  addItemToOrder: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      console.log(`Quantity must be greater than 0. Skipping item ${itemId}.`);
      return;
    }
    const item = getMenuItemObject(itemId);
    if (!item) {
      console.log(`Item with id ${itemId} not found.`);
      return;
    }

    const itemInOrder = !!get().currentOrder.find(
      (orderItem) => orderItem.id === itemId,
    );

    if (!itemInOrder) {
      set({ cloneItem: item });
    }
    setTimeout(() => {
      set((state) => {
        const existingItemIndex = state.currentOrder.findIndex(
          (orderItem) => orderItem.id === itemId,
        );

        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const updatedOrder = [...state.currentOrder];
          updatedOrder[existingItemIndex].quantity += quantity;

          return { currentOrder: updatedOrder };
        }

        // Add new item if it doesn't exist in the order
        const newOrderItem: OrderItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          calories: item.calories,
        };

        return { currentOrder: [...state.currentOrder, newOrderItem] };
      });
      if (!itemInOrder) {
        set({ cloneItem: null });
      }
    }, 100);
    console.log(`Added to order: ${quantity}x ${item.name}`);
  },

  /**
   * Sets the clone item for animations or UI purposes.
   *
   * @param item - The item to clone or null to clear the clone.
   */
  setCloneItem: (item: Item | null) => {
    set({ cloneItem: item });
  },

  /**
   * Edits the quantity of an existing item in the order.
   *
   * @param itemId - The ID of the item to edit.
   * @param quantity - The new quantity to set.
   */
  editItemInOrder: (itemId: string, quantity: number) => {
    const item = getMenuItemObject(itemId);
    if (!item) {
      console.log(`Item with id ${itemId} not found.`);
      return;
    }

    set((state) => ({
      currentOrder: state.currentOrder.map((orderItem) =>
        orderItem.id === itemId ? { ...orderItem, quantity } : orderItem,
      ),
    }));
    console.log(`Edited item in order: ${itemId}`);
  },

  /**
   * Removes an item from the current order by its ID.
   *
   * @param itemId - The ID of the item to remove.
   */
  removeItemFromOrder: (itemId) => {
    set((state) => ({
      currentOrder: state.currentOrder.filter((item) => item.id !== itemId),
    }));
    console.log(`Removed item from order: ${itemId}`);
  },

  /**
   * Generates a summary of the current order, including the total price.
   *
   * @returns An object containing the items in the current order and the total price.
   */
  showOrderSummary: () => {
    const currentOrder = get().currentOrder;
    const itemsTotal = currentOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryCost = 0.5; // Fixed delivery cost, adjust as needed
    const total = itemsTotal + deliveryCost;

    return {
      items: currentOrder,
      itemsTotal,
      deliveryCost,
      total,
    };
  },

  /**
   * Completes the current order, sets the isCompleted flag, and resets the order state.
   *
   * @returns An object containing the items in the completed order and the total price.
   */
  completeOrder: () => {
    const orderSummary = get().showOrderSummary();
    set({ isCompleted: true, currentOrder: [] });
    return orderSummary;
  },

  /**
   * Cancels the current order and resets the order state.
   */
  cancelOrder: () => {
    set({ currentOrder: [] });
  },

  /**
   * Resets the order and sets isCompleted to false.
   */
  resetOrder: () => {
    set({ currentOrder: [], isCompleted: false });
  },
});
