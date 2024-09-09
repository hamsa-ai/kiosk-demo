import type React from "react";
import { useKioskStore } from "@/store/kioskStore";
import DeliciousLogo from "../DeliciousLogo";
import Cart from "./Cart";
import ItemList from "./Itemlist";

/**
 * The screen displaying the item list and cart.
 * It shows items from the selected category or combo step.
 *
 * @param {Object} props
 * @param {boolean} props.isCombo - Whether the user is in a combo flow.
 * @returns {JSX.Element} The rendered ItemAndCartScreen component.
 */
const ItemAndCartScreen: React.FC<{ isCombo: boolean }> = ({ isCombo }) => {
  const {
    currentCategory,
    getItemsForCurrentStep,
    removeCategory,
    resetCombo,
  } = useKioskStore((state) => ({
    currentCategory: state.currentCategory,
    getItemsForCurrentStep: state.getItemsForCurrentStep,
    removeCategory: state.removeCategory,
    resetCombo: state.resetCombo,
  }));

  const items = isCombo ? getItemsForCurrentStep() : currentCategory?.items;

  /**
   * Handles the "Main menu" button click to reset the current category.
   */
  const handleMainMenuClick = () => {
    removeCategory();
    resetCombo();
  };

  return (
    <div className="relative flex h-full flex-row items-start justify-between overflow-hidden bg-white">
      {/* Item list section */}
      <div className="relative flex h-full w-[70%] flex-col p-6">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <DeliciousLogo className="w-[147.66px]" />
            <button
              type="button"
              className="rounded-full border border-black px-4 py-2 font-baloo2 font-bold text-black"
              onClick={handleMainMenuClick}
            >
              Main menu?
            </button>
          </div>
        </div>

        {/* ItemList */}
        <div className="relative">
          <ItemList
            items={items ?? []}
            title={isCombo ? "Combo Meals" : currentCategory?.name || ""}
            discount={isCombo ? "20% off" : undefined}
            isCombo={isCombo}
          />
        </div>
      </div>

      {/* Cart section */}
      <div className="h-full w-[30%]">
        <Cart />
      </div>
    </div>
  );
};

export default ItemAndCartScreen;
