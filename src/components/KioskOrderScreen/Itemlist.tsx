import type React from "react";
import type { Item } from "@/store/types";
import { useKioskStore } from "@/store/kioskStore";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  onAdd: (item: Item) => void;
  isComboActive: boolean;
  isTwoColumns: boolean;
}

/**
 * Renders an individual item card.
 * @component
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd, isTwoColumns }) => {
  return (
    <button
      type="button"
      className={cn(
        "flex h-full cursor-pointer flex-col items-center justify-between rounded-[13.27px] border border-white bg-white p-2 pb-4 text-center shadow-default transition-colors hover:border-limeGreen2",
        isTwoColumns && "h-[339.13px]",
      )}
      onClick={() => onAdd(item)}
    >
      <img
        src={item.image}
        alt={item.name}
        className={cn(
          "h-[75.84px] w-[89px] object-scale-down",
          isTwoColumns && "h-[159px] w-[159px]",
        )}
      />
      <div>
        <p
          className={cn(
            "font-baloo2 font-bold text-[14.74px]",
            isTwoColumns && "text-[22.12px]",
          )}
        >
          {item.name}
        </p>
        <p
          className={cn(
            "font-baloo2 font-bold text-[11.06px] text-black/50",
            isTwoColumns && "text-[18.43px]",
          )}
        >
          {"150g"}
        </p>
        <p
          className={cn(
            "font-baloo2 font-bold text-[14.74px] text-limeGreen2",
            isTwoColumns && "text-[25.8px]",
          )}
        >
          ${item.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
};

interface ItemListProps {
  items: Item[];
  title: string;
  isCombo: boolean;
  discount?: string;
}

/**
 * Renders a list of items with a title and optional discount.
 * @component
 */
const ItemList: React.FC<ItemListProps> = ({
  items,
  title,
  discount,
  isCombo,
}) => {
  const isTwoColumns = items.length === 2;
  const addItemToOrder = useKioskStore((state) => state.addItemToOrder);
  const nextComboStep = useKioskStore((state) => state.nextComboStep);
  const currentComboStep = useKioskStore((state) => state.currentComboStep);

  const isComboActive = currentComboStep !== null;

  /**
   * Handles adding an item to the order and advancing the combo step if applicable.
   * @param {Item} item - The item to add.
   */
  const handleAddItem = (item: Item) => {
    addItemToOrder(item.id, 1);

    if (isComboActive) {
      nextComboStep();
    }
  };

  return (
    <div className="relative z-[30] w-full p-6 px-8 pt-0">
      <div className="mb-4 flex items-center">
        {isCombo ? (
          <h2 className="mr-2 font-baloo2 text-[30.96px]">
            <span className="font-bold text-[36px]">Combo,</span> Meals
          </h2>
        ) : (
          <h2 className="mr-2 font-baloo2 font-bold text-[30.96px]">{title}</h2>
        )}

        {discount && (
          <span className="ml-2 rounded-full bg-lightGreen px-2 py-1 font-baloo2 font-bold text-[14.74px] text-black text-sm">
            {discount}
          </span>
        )}
      </div>
      <div
        className={cn("grid grid-cols-3 gap-5", isTwoColumns && "grid-cols-2")}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAdd={handleAddItem}
            isComboActive={isComboActive}
            isTwoColumns={isTwoColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
