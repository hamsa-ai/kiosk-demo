export const agentTools = [
	{
		function_name: "select_category",
		fn: (categoryId: string) => {
			return window.kioskStore.selectCategory(categoryId) + 
				" you are now in the category " + categoryId + ". Which item do you want to order?";
		},
		description: `
        This function should be called when the user mentions a category they want to explore or select from.
        Except for combo meals.
      `,
		parameters: [
			{
				name: "categoryId",
				type: "string",
				description: "The ID of the category to select.",
			},
		],
		required: ["categoryId"],
	},
	{
		function_name: "add_item_to_order",
		fn: (itemId: string, quantity: number) => {
			return window.kioskStore.addItemToOrder(itemId, quantity) + 
				" you have added " + quantity + " of " + itemId + " to your order.";
		},
		description: `
        This function should be called when the user selects an item from a category (e.g., a sandwich, drink, or sauce).
      `,
		parameters: [
			{
				name: "itemId",
				type: "string",
				description: "The id of the item to add to the order.",
			},
			{
				name: "quantity",
				type: "number",
				description: "The quantity of the item to add to the order.",
			},
		],
		required: ["itemId", "quantity"],
	},
	{
		function_name: "edit_item_in_order",
		fn: (itemId: string, quantity: number) => {
			return window.kioskStore.editItemInOrder(itemId, quantity) +
				" you have edited the quantity of " + itemId + " to " + quantity;
		},
		description: `
        This function should be called when the user wants to change the quantity of an item they've already added to the order.
      `,
		parameters: [
			{
				name: "itemId",
				type: "string",
				description: "The id of the item to edit in the order.",
			},
			{
				name: "quantity",
				type: "number",
				description: "The new quantity of the item.",
			},
		],
		required: ["itemId", "quantity"],
	},
	{
		function_name: "remove_item_from_order",
		fn: (itemId: string) => {
			return window.kioskStore.removeItemFromOrder(itemId) +
				" you have removed " + itemId + " from your order.";
		},
		description: `
            This function should be called when the user decides they no longer want an item.
      `,
		parameters: [
			{
				name: "itemId",
				type: "string",
				description: "The ID of the item to remove from the order.",
			},
		],
		required: ["itemId"],
	},
	{
		function_name: "show_order_summary",
		fn: window.kioskStore.showOrderSummary,
		description: `
        Generates a summary of the current order, displaying the total cost.
        - **Usage:** Call this function when the user requests a review of their order or asks for the total price.
        - **Edge Cases:** Ensure that the summary reflects all the latest updates, including edited or removed items.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "cancel_order",
		fn: window.kioskStore.cancelOrder,
		description: `
        Cancels the current order and resets all state, including selected categories and combo steps.
        - **Usage:** Call this when the user wants to cancel their entire order.
        - **Edge Cases:** Ensure all selections and states are cleared so that the system is ready for a new order without leftover data.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "reset_state",
		fn: window.kioskStore.resetState,
		description: `
        Fully resets the entire kiosk state, clearing all selections and orders.
        - **Usage:** Call this when the user wants to start fresh.
        - **Edge Cases:** Warn the user that all selections and data will be cleared if they confirm a reset.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "start_combo_order",
		fn: window.kioskStore.startComboOrder,
		description: `
        Initiates a combo meal order by starting at the first step of the combo process (e.g., choosing a sandwich).
        - **Usage:** Call this function when the user selects a combo meal.
        - **Edge Cases:** Ensure the combo exists. If the user starts a new combo while another is incomplete, reset the current combo before starting a new one.
      `,
		parameters: [
			{
				name: "comboId",
				type: "string",
				description: "The ID of the combo meal to start.",
			},
		],
		required: ["comboId"],
	},
	{
		function_name: "next_combo_step",
		fn: window.kioskStore.nextComboStep,
		description: `
        Moves to the next step in the combo meal selection process (e.g., from sandwich to fries).
        - **Usage:** Call this function after an item is selected in the current step to proceed to the next one.
        - **Edge Cases:** Ensure the user has made a valid selection before advancing. If this is the final step, the combo is completed.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "previous_combo_step",
		fn: window.kioskStore.previousComboStep,
		description: `
        Moves back to the previous step in the combo meal selection process.
        - **Usage:** Call this when the user wants to change their selection from a previous step.
        - **Edge Cases:** Ensure that the user cannot go back before the first step. Any item selected in the current step might need to be reset.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "skip_combo_step",
		fn: window.kioskStore.skipComboStep,
		description: `
        Skips the current step in the combo meal process and advances to the next step (e.g., skipping fries).
        - **Usage:** Use this function when the user explicitly states they want to skip a step in the combo.
        - **Edge Cases:** Ensure that skipping steps does not leave the combo in an inconsistent state. If skipping the last step, finalize the combo.
      `,
		parameters: [],
		required: [],
	},
];
