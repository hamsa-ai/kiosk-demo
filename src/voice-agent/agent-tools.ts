import { initialState } from "@/store/initialState";
import { useKioskStore } from "@/store/kioskStore";

export const agentTools = [
  {
    function_name: "select_category",
    fn: (categoryId: string) => {
      console.log("categoryId :", categoryId);
      return `${useKioskStore.getState().selectCategory(categoryId)} you are now in the category ${categoryId}. Which item do you want to order?`;
    },
    description:
      "This function opens the category of products, it should be called whenever the users ask about a product in a category, or ask about the category products (ex Which sandwiches you have?)",
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
      return `${useKioskStore.getState().currentCategory !== categoryId && categoryId != null && useKioskStore.getState().selectCategory(categoryId)}${useKioskStore.getState().addItemToOrder(itemId, quantity)}`;
    },
    description:
      "This function should be called when the user selects an item from a category (e.g., a sandwich, drink, or sauce).",
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
      return `${useKioskStore.getState().editItemInOrder(itemId, quantity)} you have edited the quantity of ${itemId} to ${quantity}`;
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
      return `${useKioskStore.getState().removeItemFromOrder(itemId)} you have removed ${itemId} from your order.`;
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
      return `This is summary is: ${useKioskStore.getState().showOrderSummary()} `;
    },
    description: "Shows the summary of the order and the total amount",
    parameters: [],
    required: [],
  },
  {
    function_name: "cancel_order",
    fn: () => {
      return `${useKioskStore.getState().cancelOrder()} Order was cancelled`;
    },
    description:
      "Cancels the current order and resets all state, including selected categories.",
    parameters: [],
    required: [],
  },
  {
    function_name: "reset_order_and_start_new_order",
    fn: () => {
      return `${useKioskStore.setState(initialState)} The order has started over`;
    },
    description: "Reset the current order and start new order",
    parameters: [],
    required: [],
  },
];
