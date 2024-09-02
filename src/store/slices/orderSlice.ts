import type { StateCreator } from "zustand";

/**
 * Represents an item in the order.
 */
export interface OrderItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

/**
 * Interface representing the slice of state related to order management.
 */
export interface OrderSlice {
	currentOrder: OrderItem[];
	addItemToOrder: (item: OrderItem) => void;
	editItemInOrder: (itemId: string, newDetails: Partial<OrderItem>) => void;
	removeItemFromOrder: (itemId: string) => void;
	showOrderSummary: () => { items: OrderItem[]; total: string };
	completeOrder: () => { items: OrderItem[]; total: string };
	cancelOrder: () => void;
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

	/**
	 * Adds an item to the current order. If the item already exists in the order, it updates the quantity.
	 *
	 * @param item - The OrderItem to add or update in the order.
	 */
	addItemToOrder: (item) => {
		set((state) => {
			const existingItemIndex = state.currentOrder.findIndex(
				(orderItem) => orderItem.id === item.id
			);

			if (existingItemIndex !== -1) {
				// Update quantity if item already exists
				const updatedOrder = [...state.currentOrder];
				updatedOrder[existingItemIndex].quantity += item.quantity;
				return { currentOrder: updatedOrder };
			}

			// Add new item if it doesn't exist in the order
			return { currentOrder: [...state.currentOrder, item] };
		});
		console.log(`Added to order: ${item.quantity}x ${item.name}`);
	},

	/**
	 * Edits the details of an existing item in the order.
	 *
	 * @param itemId - The ID of the item to edit.
	 * @param newDetails - The new details to update for the item.
	 */
	editItemInOrder: (itemId, newDetails) => {
		set((state) => ({
			currentOrder: state.currentOrder.map((item) =>
				item.id === itemId ? { ...item, ...newDetails } : item
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
			currentOrder: state.currentOrder.filter(
				(item) => item.id !== itemId
			),
		}));
		console.log(`Removed item from order: ${itemId}`);
	},

	/**
	 * Generates a summary of the current order, including the total price.
	 *
	 * @returns An object containing the items in the current order and the total price.
	 */
	showOrderSummary: () => {
		const total = get()
			.currentOrder.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)
			.toFixed(2);
		console.log("Current order:", get().currentOrder);
		console.log("Total price:", total);
		return { items: get().currentOrder, total };
	},

	/**
	 * Completes the current order and resets the order state.
	 *
	 * @returns An object containing the items in the completed order and the total price.
	 */
	completeOrder: () => {
		const orderSummary = get().showOrderSummary();
		console.log("Order completed!");
		set({ currentOrder: [] });
		return orderSummary;
	},

	/**
	 * Cancels the current order and resets the order state.
	 */
	cancelOrder: () => {
		set({ currentOrder: [] });
		console.log("Order cancelled.");
	},
});
