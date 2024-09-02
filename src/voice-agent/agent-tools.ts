export const agentTools = [
	{
		function_name: "select_category",
		fn: window.kioskStore.selectCategory,
		description: `
        Selects a category by its ID when the user wants to browse or order from a specific section (e.g., combo meals, drinks).
        - **Usage:** Call this function whenever the user mentions a category they want to explore.
        - **Edge Cases:** Ensure the category exists before selection. If the user switches categories mid-order, handle it appropriately, especially if they have started a combo meal but haven't completed it.
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
		function_name: "start_combo_order",
		fn: window.kioskStore.startComboOrder,
		description: `
        Initiates a combo meal order by starting at the first step of the combo process.
        - **Usage:** Call this function when the user selects a specific combo meal.
        - **Edge Cases:** Ensure the combo exists in the selected category. If the user starts a new combo without completing the current one, reset the current combo first.
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
        Advances to the next step in the combo meal selection process.
        - **Usage:** After the user selects an item for the current combo step, call this function to proceed to the next step.
        - **Edge Cases:** If the user tries to move to the next step without selecting an item, prompt them to make a selection. This function also handles the completion of the combo when the final step is reached, so ensure all items are added to the order before proceeding.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "previous_combo_step",
		fn: window.kioskStore.previousComboStep,
		description: `
        Moves back to the previous step in the combo meal selection process.
        - **Usage:** Call this function when the user wants to review or change a previous selection in the combo.
        - **Edge Cases:** Ensure the user cannot go back before the first step. If the user has already added an item for the current step, decide whether to keep or remove it based on the user's intent.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "skip_combo_step",
		fn: window.kioskStore.skipComboStep,
		description: `
        Skips the current step in the combo meal selection process and moves to the next step.
        - **Usage:** Use this function when the user explicitly states they want to skip a particular item in the combo (e.g., they don't want fries).
        - **Edge Cases:** Ensure that skipping a step doesn't leave the order incomplete or inconsistent. If skipping the last step, complete the combo appropriately.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "add_item_to_order",
		fn: window.kioskStore.addItemToOrder,
		description: `
        Adds an item to the current order. If the item is already in the order, it updates the quantity.
        - **Usage:** Call this function after each item selection, whether from a combo step or a regular category.
        - **Edge Cases:** Ensure that the item is added correctly if it's a combo item. The function also handles updating quantities if the item is already in the order.
      `,
		parameters: [
			{
				name: "item",
				type: "OrderItem",
				description:
					"The item to add or update in the order, including its quantity.",
			},
		],
		required: ["item"],
	},
	{
		function_name: "edit_item_in_order",
		fn: window.kioskStore.editItemInOrder,
		description: `
        Edits the details of an existing item in the order, such as changing the quantity or other properties.
        - **Usage:** Call this function when the user wants to modify an item they've already added to the order.
        - **Edge Cases:** Ensure that the item exists in the order before trying to edit it. Handle cases where the user might want to reduce the quantity to zero, which might instead require removing the item.
      `,
		parameters: [
			{
				name: "itemId",
				type: "string",
				description: "The ID of the item to edit.",
			},
			{
				name: "newDetails",
				type: "Partial<OrderItem>",
				description:
					"The new details to update for the item (e.g., updated quantity).",
			},
		],
		required: ["itemId", "newDetails"],
	},
	{
		function_name: "remove_item_from_order",
		fn: window.kioskStore.removeItemFromOrder,
		description: `
        Removes an item from the current order by its ID.
        - **Usage:** When the user decides they no longer want an item in their order, call this function.
        - **Edge Cases:** Ensure that removing an item doesn't unintentionally leave the order in an invalid state, especially if it's a combo item and the user still wants other parts of the combo.
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
        Generates a summary of the current order, including the total price.
        - **Usage:** Use this function when the user asks to review their order or see the total cost.
        - **Edge Cases:** Ensure that the summary reflects the current state of the order, including any recent edits or removals.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "complete_order",
		fn: window.kioskStore.completeOrder,
		description: `
        Finalizes the current order, clears the order state, and provides a summary of the completed order.
        - **Usage:** Call this function when the user confirms they are ready to complete the order.
        - **Edge Cases:** Ensure that all items the user expects are included in the order before completing it. After completion, reset the state appropriately for a new order.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "cancel_order",
		fn: window.kioskStore.cancelOrder,
		description: `
        Cancels the current order and resets the  window.kioskStore state, including clearing the current category and combo step.
        - **Usage:** When the user decides to cancel their entire order, call this function.
        - **Edge Cases:** Ensure that all parts of the state are reset, including any partially completed combo orders and selected categories. The function should prepare the system for a new order without any leftover data.
      `,
		parameters: [],
		required: [],
	},
	{
		function_name: "reset_state",
		fn: window.kioskStore.resetState,
		description: `
        Resets the entire  window.kioskStore state to its initial values, clearing all selections and orders.
        - **Usage:** Use this function if the user wants to start over entirely, clearing everything that has been selected or ordered so far.
        - **Edge Cases:** This is a full reset and should only be used when starting completely fresh. Ensure the user understands this will erase all current data.
      `,
		parameters: [],
		required: [],
	},
];
