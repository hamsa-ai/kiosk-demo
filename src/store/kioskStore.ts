import { create } from "zustand";
import { type OrderSlice, createOrderSlice } from "./slices/orderSlice";
import {
  type CategorySlice,
  createCategorySlice,
} from "./slices/categorySlice";

import { initialState } from "./initialState";

type KioskState = OrderSlice & CategorySlice;

// Create the Zustand store by combining the slices
export const useKioskStore = create<KioskState>((...a) => ({
  ...createOrderSlice(...a),
  ...createCategorySlice(...a),
}));

// Extend the Window interface to include kioskStore with the correct type
declare global {
  interface Window {
    kioskStore: KioskState & {
      getState: () => KioskState;
      resetState: () => void;
    };
  }
}

// Expose the store and its actions globally for console access
if (typeof window !== "undefined") {
  window.kioskStore = {
    getState: useKioskStore.getState,
    resetState: () => useKioskStore.setState(initialState),
    ...useKioskStore.getState(),
  };
}
