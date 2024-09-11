export const agentTools = [
  {
    function_name: "select_category",
    fn: (categoryId: string) => {
      console.log("categoryId :", categoryId);
      return `${window.kioskStore.selectCategory(categoryId)} you are now in the category ${categoryId}. Which item do you want to order?`;
    },
    description: "This function opens the category of products, it should be called whenever the users ask about a product in a category, or ask about the category products (ex Which sandwiches you have?)",
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
    fn: (itemId: string, quantity: number, categoryId: string | null) => {
      console.log("Item ordered", itemId);
      return `${window.kioskStore.currentCategory !== categoryId && categoryId != null && window.kioskStore.selectCategory(categoryId)}${window.kioskStore.addItemToOrder(itemId, quantity)}`;
    },
    description: "This function should be called when the user selects an item from a category (e.g., a sandwich, drink, or sauce).",
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
      {
        name: "categoryId",
        type: "string",
        description: "The ID of the category of the item.",
      },
    ],
    required: ["itemId", "quantity", "categoryId"],
  },
  {
    function_name: "edit_item_in_order",
    fn: (itemId: string, quantity: number) => {
      return `${window.kioskStore.editItemInOrder(itemId, quantity)} you have edited the quantity of ${itemId} to ${quantity}`;
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
      return `${window.kioskStore.removeItemFromOrder(itemId)} you have removed ${itemId} from your order.`;
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
    fn: () => {
      return `This is summary is: ${window.kioskStore.showOrderSummary()} `;
    },
    description: "Shows the summary of the order and the total amount",
    parameters: [],
    required: [],
  },
  {
    function_name: "cancel_order",
    fn: () => {
      return `${window.kioskStore.cancelOrder()} Order was cancelled`;
    },
    description: "Cancels the current order and resets all state, including selected categories and combo steps.",
    parameters: [],
    required: [],
  },
  {
    function_name: "reset_order_and_start_new_order",
    fn: () => {
      return `${window.kioskStore.resetState()} The order has started over`;
    },
    description: "Reset the current order and start new order",
    parameters: [],
    required: [],
  },
  {
    function_name: "start_combo_meal",
    fn: () => {
      window.kioskStore.startComboOrder();
      return `You're in the combo`;
    },
    description: "Starts a new combo meal order",
    parameters: [],
    required: [],
  },
  {
    function_name: "next_combo_step",
    fn: () => {
      window.kioskStore.nextComboStep();
      return "Now what?";
    },
    description: "Moves to the next step in the combo meal selection process (e.g., from sandwich to fries).",
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
