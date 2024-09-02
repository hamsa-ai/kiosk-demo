import { describe, it, expect } from "vitest";
import {
	createCategorySlice,
	type CategorySlice,
} from "../store/slices/categorySlice";
import { menuData } from "../store/menuData";
import { create } from "../__mocks__/zustand";

type TestStore = CategorySlice;

const useCategoryStore = create<TestStore>((...a) => ({
	...createCategorySlice(...a),
}));

// Utility function to get the updated state
const getUpdatedState = () => useCategoryStore.getState();

describe("CategorySlice", () => {
	/**
	 * Scenario: Initial State
	 * This test checks if the initial state of the store is set correctly.
	 */
	it("should have initial state", () => {
		const state = getUpdatedState();
		expect(state.currentCategory).toBeNull();
	});

	/**
	 * Scenario: Selecting a Category by ID
	 * This test verifies that selecting a category by its ID updates the state correctly.
	 */
	it("should select a category by id", () => {
		const state = getUpdatedState();
		const categoryId = menuData.categories[0].id;

		state.selectCategory(categoryId);

		const updatedState = getUpdatedState();
		expect(updatedState.currentCategory).not.toBeNull();
		expect(updatedState.currentCategory?.id).toBe(categoryId);
	});

	/**
	 * Scenario: Handling Non-Existent Category ID
	 * This test ensures that selecting a non-existent category ID returns null and does not alter the state.
	 */
	it("should return null if category id does not exist", () => {
		const state = getUpdatedState();

		const result = state.selectCategory("non_existent_id");

		const updatedState = getUpdatedState();
		expect(result).toBeNull();
		expect(updatedState.currentCategory).toBeNull();
	});

	/**
	 * Scenario: Switching Between Categories
	 * This test verifies that switching from one category to another updates the state correctly.
	 */
	it("should switch between categories", () => {
		const state = getUpdatedState();

		// Select the first category
		const firstCategoryId = menuData.categories[0].id;
		state.selectCategory(firstCategoryId);
		let updatedState = getUpdatedState();
		expect(updatedState.currentCategory?.id).toBe(firstCategoryId);

		// Switch to another category
		const secondCategoryId = menuData.categories[1].id;
		state.selectCategory(secondCategoryId);
		updatedState = getUpdatedState();
		expect(updatedState.currentCategory?.id).toBe(secondCategoryId);
	});

	/**
	 * Scenario: Re-selecting the Same Category
	 * This test ensures that re-selecting the same category does not alter the state.
	 */
	it("should not change state when re-selecting the same category", () => {
		const state = getUpdatedState();

		// Select a category
		const categoryId = menuData.categories[0].id;
		state.selectCategory(categoryId);
		let updatedState = getUpdatedState();
		const previousCategory = updatedState.currentCategory;

		// Re-select the same category
		state.selectCategory(categoryId);
		updatedState = getUpdatedState();

		// The state should remain the same
		expect(updatedState.currentCategory).toEqual(previousCategory);
	});
});
