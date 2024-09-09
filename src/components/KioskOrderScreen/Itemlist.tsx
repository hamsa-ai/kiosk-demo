import type React from "react";
import { motion } from "framer-motion";
import type { Item } from "@/store/types";
import { useKioskStore } from "@/store/kioskStore";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  onAdd: (item: Item) => void;
  isComboActive: boolean;
  isTwoColumns: boolean;
}

interface ItemCardButtonProps {
  item: Item;
  onAdd: (item: Item) => void;
  isTwoColumns: boolean;
  className?: string;
  layoutId?: string;
}

const ItemCardButton: React.FC<ItemCardButtonProps> = ({
  item,
  onAdd,
  isTwoColumns,
  className,
  layoutId,
}) => {
  return (
    <motion.button
      type="button"
      className={cn(
        "relative flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-[13.27px] border border-white bg-white p-2 pb-4 text-center shadow-default transition-colors hover:border-limeGreen2",
        className,
      )}
      onClick={() => onAdd(item)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layoutId={layoutId}
    >
      <motion.img
        src={item.image}
        alt={item.name}
        className={cn(
          "h-[75.84px] w-[89px]",
          isTwoColumns && "h-[170px] w-[170px]",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>
    </motion.button>
  );
};

/**
 * Renders an individual item card.
 * @component
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd, isTwoColumns }) => {
  return (
    <div
      className={cn("relative h-full w-full", isTwoColumns && "h-[339.13px]")}
    >
      <ItemCardButton
        item={item}
        onAdd={onAdd}
        isTwoColumns={isTwoColumns}
        // className="z-[30]"
      />
      {/* <ItemCardButton
        item={item}
        onAdd={onAdd}
        isTwoColumns={isTwoColumns}
        className="!z-[40] absolute inset-0 shadow-none"
        layoutId={item.id}
      /> */}
    </div>
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
    <motion.div
      className="relative z-[30] w-full p-6 px-8 pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center">
        {isCombo ? (
          <h2 className="mr-2 font-baloo2 text-[30.96px]">
            <motion.span
              className="font-bold text-[36px]"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Combo,
            </motion.span>{" "}
            Meals
          </h2>
        ) : (
          <motion.h2
            className="mr-2 font-baloo2 font-bold text-[30.96px]"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}

        {discount && (
          <motion.span
            className="ml-2 rounded-full bg-lightGreen px-2 py-1 font-baloo2 font-bold text-[14.74px] text-black text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {discount}
          </motion.span>
        )}
      </div>

      <motion.div
        className={cn("grid grid-cols-3 gap-5", isTwoColumns && "grid-cols-2")}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
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
      </motion.div>
    </motion.div>
  );
};

export default ItemList;
