import { menuData } from "@/store/menuData";
import { Item } from "@/store/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Get the image URL for an item based on its ID from the menu data.
 * @param {string} itemId - The ID of the item.
 * @returns {string} - The image URL of the item.
 */
export const getItemImage = (itemId: string): string => {
  for (const category of menuData.categories) {
    const item = category.items?.find((item) => item.id === itemId);
    if (item) return item.image;
  }
  return ""; // Fallback if the item is not found
};


type potentiallyNull<T> = T | null;

export const getMenuItemObject = (itemId: string): potentiallyNull<Item> => {
  for (const category of menuData.categories) {
  console.log('category :', category);
    const item = category.items?.find((item) => item.id === itemId);
    console.log('item :', item);
    if (item) return item;
    }
    return null;
};