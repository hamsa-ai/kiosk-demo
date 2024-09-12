import { create } from "zustand";
import { type OrderSlice, createOrderSlice } from "./slices/orderSlice";
import {
  type CategorySlice,
  createCategorySlice,
} from "./slices/categorySlice";
import {
  createLanguageSlice,
  type LanguageSlice,
} from "./slices/languageSlice";

type KioskState = OrderSlice & CategorySlice & LanguageSlice;

// Create the Zustand store by combining the slices
export const useKioskStore = create<KioskState>((...a) => ({
  ...createOrderSlice(...a),
  ...createCategorySlice(...a),
  ...createLanguageSlice(...a),
}));
