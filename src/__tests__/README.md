# **Testing Overview**

This directory contains the unit tests for the Voice-Controlled Kiosk Demo application. The tests are designed to ensure that the state management logic and the interactions within the app work as expected. The testing framework used is [Vitest](https://vitest.dev/), which is a fast and easy-to-use testing library.

## **Directory Structure**

```
/__tests__
├── categorySlice.test.ts
├── comboSlice.test.ts
├── kioskStore.test.ts
└── orderSlice.test.ts
```

### **Files and Their Roles**

-   **`categorySlice.test.ts`**: Tests for the `CategorySlice`, which manages category selections within the application.
-   **`comboSlice.test.ts`**: Tests for the `ComboSlice`, which handles the logic for selecting items within a combo meal.
-   **`kioskStore.test.ts`**: Comprehensive tests for the entire `kioskStore`, which combines the individual slices into a unified store and simulates complete user flows through the kiosk system.
-   **`orderSlice.test.ts`**: Tests for the `OrderSlice`, which manages the current order, including actions like adding items, editing quantities, and canceling orders.

## **Testing with Vitest**

### **Why Vitest?**

Vitest is chosen for this project due to its speed, simplicity, and seamless integration with TypeScript. It allows for writing clear and concise test cases while providing powerful assertions and mocking capabilities.

### **Test Coverage**

The tests in this directory are designed to cover all critical scenarios, including edge cases, that the kiosk system might encounter. The goal is to ensure that the state management logic is robust, accurate, and handles real-world user interactions correctly.

### **Key Testing Scenarios**

Each test file focuses on specific aspects of the state management:

1. **CategorySlice Tests**:

    - Verifies the initial state of category selection.
    - Tests the ability to select categories by ID.
    - Ensures correct handling when attempting to select a non-existent category.

2. **ComboSlice Tests**:

    - Validates the flow of a combo meal selection, including moving between steps.
    - Ensures proper handling of edge cases, such as attempting to move beyond the final combo step.
    - Tests the behavior when skipping steps and returning to previous steps.

3. **OrderSlice Tests**:

    - Tests adding items to the order, ensuring quantities update correctly.
    - Verifies the functionality for editing and removing items from the order.
    - Confirms that order cancellation and completion work as expected, including resetting the state.

4. **KioskStore Tests**:
    - Simulates complete user flows, from starting an order to completing or canceling it.
    - Tests complex scenarios involving multiple categories and item selections.
    - Ensures that the store correctly handles interactions between the various slices, maintaining a consistent state throughout.

### **How to Run the Tests**

To run the tests, simply execute the following command in the root directory of the project:

```bash
npx vitest
```


This will trigger Vitest to run all the test cases in the `__tests__` directory, outputting the results to the console.

### **Extending Tests**

If new features or state slices are added to the application, you should:

1. **Create New Test Files**:

    - Add a corresponding test file in the `__tests__` directory.
    - Write test cases that cover the new functionality, including edge cases.

2. **Update Existing Tests**:

    - If existing functionality is modified, ensure that related tests are updated to reflect the changes.
    - Rerun all tests to confirm that the application behaves as expected.

3. **Maintain Test Coverage**:
    - Strive to maintain high test coverage, particularly for critical business logic and state management functions.

### **Best Practices**

-   **Write Descriptive Test Cases**: Ensure that each test case clearly describes what it is testing and what the expected outcome is.
-   **Test Edge Cases**: Always include tests for edge cases, such as invalid inputs, empty states, and boundary conditions.
-   **Keep Tests Modular**: Tests should be independent and modular, focusing on one aspect of the functionality at a time.

### **Example Test Case**

Here’s an example of a test case from the `kioskStore.test.ts` file:

```typescript
import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useKioskStore } from "../store/kioskStore";

/**
 * Scenario: Simple Combo Meal Order with Editing and Completion
 * This test verifies that a user can select a combo meal, edit their selection, and complete the order successfully.
 */
it("Scenario 1: Simple Combo Meal Order with Editing and Completion", () => {
	const store = useKioskStore.getState();

	// Initial state check
	expect(store.currentOrder).toEqual([]);
	expect(store.currentCategory).toBeNull();
	expect(store.currentComboStep).toBeNull();

	// Simulate category selection and order placement
	act(() => {
		store.selectCategory("combo_meal");
		store.startComboOrder("burger_combo");
		store.nextComboStep();
		store.addItemToOrder({
			id: "classic_burger",
			name: "Classic Burger",
			price: 5.99,
			quantity: 1,
		});
	});

	// Validate order completion
	const completedOrder = store.completeOrder();
	expect(completedOrder.items).toHaveLength(1);
	expect(completedOrder.total).toBe("5.99");
});
```

### **Conclusion**

The `__tests__` directory plays a crucial role in maintaining the stability and reliability of the Voice-Controlled Kiosk Demo application. By covering all essential scenarios and edge cases, these tests ensure that the state management logic is robust and performs as expected in real-world conditions.
