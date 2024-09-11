import { create } from "zustand";
import { type OrderSlice, createOrderSlice } from "./slices/orderSlice";
import {
  type CategorySlice,
  createCategorySlice,
} from "./slices/categorySlice";

type KioskState = OrderSlice & CategorySlice;

// Create the Zustand store by combining the slices
export const useKioskStore = create<KioskState>((...a) => ({
  ...createOrderSlice(...a),
  ...createCategorySlice(...a),
}));
