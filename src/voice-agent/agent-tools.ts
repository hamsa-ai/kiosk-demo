import { initialState } from "@/store/initialState";
import { useKioskStore } from "@/store/kioskStore";
import { getMenuItemObject } from "@/lib/utils";


const debugEnabled = true;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const debugLog = (message: string, ...args: any[]) => {
  if (debugEnabled) {
    console.log(message, ...args);
  }
};

export const agentTools = [
  {
    function_name: "select_category",
    fn: (categoryId: string): string => {
      debugLog("Selecting category with ID:", categoryId);
      try {
        useKioskStore.getState().selectCategory(categoryId);
        const successMessage = `You are now in the category ${categoryId}. Which item do you want to order?`;
        debugLog("Result of select_category:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in select_category:", error.message);
        return error.message;
      }
    },
    description:
      "This function opens the category of products. It should be called whenever users ask about a product in a category or inquire about the products within a category (e.g., 'Which sandwiches do you have?').",
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
    fn: (itemId: string, quantity: number, categoryId: string): string => {
      debugLog("Adding item to order:", { itemId, quantity, categoryId });
      try {
        const { currentCategory, selectCategory, addItemToOrder } = useKioskStore.getState();

        // Change category if necessary
        if (
          categoryId &&
          currentCategory?.id !== categoryId
        ) {
          selectCategory(categoryId);
          debugLog("Category changed to:", categoryId);
        }

        // Add the item to the order
        addItemToOrder(itemId, quantity);

        // Retrieve item details for the success message
        const item = getMenuItemObject(itemId);
        if (!item) {
          // This should not happen as addItemToOrder would have thrown an error
          throw new Error(`Error: Item with id ${itemId} not found after adding.`);
        }

        const successMessage = `Added ${quantity} of ${item.name} to your order.`;
        debugLog("Result of add_item_to_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in add_item_to_order:", error.message);
        return error.message;
      }
    },
    description:
      "This function should be called when the user selects an item from a category (e.g., a sandwich, drink, or sauce) from the menu provided in the prompt.",
    parameters: [
      {
        name: "itemId",
        type: "string",
        description:
          "The ID of the item to add to the order from the list provided earlier. Do not use new IDs!",
      },
      {
        name: "quantity",
        type: "number",
        description: "The quantity of the item to add to the order.",
      },
      {
        name: "categoryId",
        type: "string",
        description:
          "The ID of the category of the item from the list provided earlier. Do not use new IDs!",
      },
    ],
    required: ["itemId", "quantity", "categoryId"],
  },
  {
    function_name: "edit_item_in_order",
    fn: (itemId: string, quantity: number): string => {
      debugLog("Editing item in order:", { itemId, quantity });
      try {
        useKioskStore.getState().editItemInOrder(itemId, quantity);
        const successMessage = `You have edited the quantity of ${itemId} to ${quantity}.`;
        debugLog("Result of edit_item_in_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in edit_item_in_order:", error.message);
        return error.message;
      }
    },
    description: `
      This function should be called when the user wants to change the quantity of an item they've already added to the order.
    `,
    parameters: [
      {
        name: "itemId",
        type: "string",
        description: "The ID of the item to edit in the order.",
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
    fn: (itemId: string): string => {
      debugLog("Removing item from order:", itemId);
      try {
        useKioskStore.getState().removeItemFromOrder(itemId);
        const successMessage = `You have removed ${itemId} from your order.`;
        debugLog("Result of remove_item_from_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in remove_item_from_order:", error.message);
        return error.message;
      }
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
    function_name: "cancel_order",
    fn: (): string => {
      debugLog("Cancelling order.");
      try {
        useKioskStore.getState().cancelOrder();
        const successMessage = "Order was cancelled.";
        debugLog("Result of cancel_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in cancel_order:", error.message);
        return error.message;
      }
    },
    description:
      "Cancels the current order and resets all state, including selected categories.",
    parameters: [],
    required: [],
  },
  {
    function_name: "complete_order",
    fn: (): string => {
      debugLog("Completing order.");
      try {
        useKioskStore.getState().completeOrder();
        const successMessage = "Order was completed successfully.";
        debugLog("Result of complete_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in complete_order:", error.message);
        return error.message;
      }
    },
    description: "Completes the current order.",
    parameters: [],
    required: [],
  },
  {
    function_name: "go_to_main_menu",
    fn: (): string => {
      debugLog("Returning to main menu.");
      try {
        useKioskStore.getState().removeCategory();
        const successMessage = "You are now in the main menu.";
        debugLog("Result of go_to_main_menu:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in go_to_main_menu:", error.message);
        return error.message;
      }
    },
    description: "Go to main menu.",
    parameters: [],
    required: [],
  },
  {
    function_name: "reset_order_and_start_new_order",
    fn: (): string => {
      debugLog("Resetting order and starting new order.");
      try {
        useKioskStore.setState(initialState);
        const successMessage = "The order has started over.";
        debugLog("Result of reset_order_and_start_new_order:", successMessage);
        return successMessage;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        debugLog("Error in reset_order_and_start_new_order:", error.message);
        return error.message;
      }
    },
    description: "Reset the current order and start a new order.",
    parameters: [],
    required: [],
  },
];