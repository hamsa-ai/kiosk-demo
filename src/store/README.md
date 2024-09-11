# **State Management Overview**

This directory contains the state management setup for the Voice-Controlled Kiosk Demo, using [Zustand](https://github.com/pmndrs/zustand) for efficient and scalable state management.

## **Directory Structure**

```
/store
├── /slices
│   ├── categorySlice.ts
│   └── orderSlice.ts
├── initialState.ts
├── kioskStore.ts
├── menuData.ts
└── types.ts
```

### **Files and their Roles**

-   **`/slices`**: Contains individual slices of the state, each responsible for managing a specific part of the application's state.

    -   **`categorySlice.ts`**: Manages the current category selection and category-related actions, ensuring that users can switch between categories effectively.
    -   **`orderSlice.ts`**: Manages the current order, including adding items, updating quantities, editing items, displaying the order summary, completing orders, and canceling orders.

-   **`initialState.ts`**: Defines the initial state of the kiosk, including empty orders and default settings, which can be reset during the application's lifecycle.

-   **`kioskStore.ts`**: Combines all the slices into a single store using Zustand's `create` method. This is the central store that the rest of the application interacts with. It also includes a reset functionality to clear the state when necessary.

-   **`menuData.ts`**: Contains the mock data for the menu. This is used within the slices to retrieve categories and items. It helps simulate real-world scenarios for testing and development.

-   **`types.ts`**: Contains TypeScript interfaces and types used across the state slices. This helps in maintaining type safety and clarity throughout the state management.

## **State Management with Zustand**

### **Why Zustand?**

Zustand is a small, fast, and scalable state management solution for React applications. It allows for a clean and modular approach to state management, making it easy to manage complex application states with minimal boilerplate.

### **How It Works**

1. **Slices**:

    - The state is divided into logical "slices" that each manage a specific part of the application state. This modularity makes the state management easier to understand, maintain, and extend.
    - Each slice is created using `StateCreator` from Zustand, allowing for precise control over state and actions related to that slice.

2. **Combining Slices**:

    - In `kioskStore.ts`, we use Zustand's `create` method to combine these slices into a single store. This unified store provides a consistent interface for the rest of the application while keeping the logic separated by domain.

3. **TypeScript Integration**:
    - TypeScript ensures that the state management is type-safe, which helps catch errors during development. Each slice and its actions are strongly typed, and these types are shared across the slices via the `types.ts` file.

### **Key Concepts**

-   **State Management**: Each slice maintains its own state and actions, which are then combined into a single store. This design keeps the application state organized and easy to manage.
-   **Modularity**: By splitting the state into slices, the application state becomes isolated and easier to manage, which improves maintainability and scalability.
-   **Reactivity**: Zustand ensures that any changes in the state automatically trigger re-renders in the affected React components.

### **Actions and Edge Cases**

The store is designed with robust actions that handle various user interactions:

-   **Adding Items to Order**: Adds items to the current order. If an item already exists, it updates the quantity instead of duplicating the item.
-   **Editing and Removing Items**: Allows users to modify the quantity or details of an item or remove it entirely from the order.
-   **Reset State**: Provides a way to reset the entire state, which is useful for scenarios like order cancellation or starting a new order.

### **Example Usage**

To use the store in a component, you can import the necessary hooks and actions:

```tsx
import useKioskStore from "@/store/kioskStore";

const OrderScreen = () => {
	const { addItemToOrder, currentOrder, showOrderSummary } = useKioskStore();

	const handleAddItem = () => {
		addItemToOrder("item1", 2);
	};

	const orderSummary = showOrderSummary();

	return (
		<div>
			<button onClick={handleAddItem}>Add Item</button>
			<div>
				{currentOrder.map((item) => (
					<div key={item.id}>
						{item.name} - {item.quantity}
					</div>
				))}
			</div>
			<div>Total: {orderSummary.total}</div>
		</div>
	);
};
```

### **Resetting State**

The store also provides a reset functionality, which can be used to reset the entire state when needed, such as after completing or canceling an order.

```tsx
import useKioskStore from "@/store/kioskStore";

const ResetButton = () => {
	const resetOrder = useKioskStore((state) => state.resetOrder);

	return <button onClick={resetOrder}>Reset Order</button>;
};
```
