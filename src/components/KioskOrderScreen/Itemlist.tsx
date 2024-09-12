import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Item } from "@/store/types";
import { useKioskStore } from "@/store/kioskStore";
import { cn } from "@/lib/utils";

interface ItemCardButtonProps {
  item: Item;
  onAdd: (item: Item) => void;
  isTwoColumns: boolean;
  className?: string;
  layoutId?: string;
  isClone?: boolean;
}

const ItemCardButton: React.FC<ItemCardButtonProps> = ({
  item,
  onAdd,
  isTwoColumns,
  className,
  layoutId,
  isClone = false,
}) => {
  return (
    <motion.button
      type="button"
      className={cn(
        "relative flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-[13.27px] border border-white bg-white p-2 pb-4 text-center shadow-default transition-colors hover:border-limeGreen2",
        className,
      )}
      onClick={() => onAdd(item)}
      whileHover={isClone ? undefined : { scale: 1.05 }}
      whileTap={isClone ? undefined : { scale: 0.95 }}
      layoutId={layoutId}
      transition={
        isClone
          ? {
              type: "spring",
              stiffness: 100,
              damping: 20,
            }
          : {}
      }
    >
      <motion.img
        src={item.image}
        alt={item.name}
        className={cn(
          "h-[75.84px] w-[89px]",
          isTwoColumns && "h-[170px] w-[170px]",
        )}
        initial={isClone ? undefined : { opacity: 0, y: 20 }}
        animate={isClone ? undefined : { opacity: 1, y: 0 }}
        transition={isClone ? undefined : { duration: 0.5 }}
      />
      <motion.div
        initial={isClone ? undefined : { opacity: 0, y: 20 }}
        animate={isClone ? undefined : { opacity: 1, y: 0 }}
        transition={isClone ? undefined : { duration: 0.6 }}
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
          {item.calories} cal
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

interface ItemCardProps {
  item: Item;
  onAdd: (item: Item) => void;
  isTwoColumns: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd, isTwoColumns }) => {
  const { cloneItem } = useKioskStore((state) => ({
    cloneItem: state.cloneItem,
  }));

  const handleAddItem = () => {
    onAdd(item);
  };

  return (
    <div
      className={cn("relative h-full w-full", isTwoColumns && "h-[339.13px]")}
    >
      <ItemCardButton
        item={item}
        onAdd={handleAddItem}
        isTwoColumns={isTwoColumns}
      />

      <AnimatePresence>
        {cloneItem && cloneItem.id === item.id && (
          <div className="pointer-events-none absolute top-0 left-0 z-50 h-full w-full">
            <ItemCardButton
              item={cloneItem}
              onAdd={() => {}}
              isTwoColumns={isTwoColumns}
              isClone
              className="!pointer-events-none"
              layoutId={`item-${cloneItem.id}`}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ItemListProps {
  items: Item[];
  title: string;
  discount?: string;
}

const ItemList: React.FC<ItemListProps> = ({ items, title, discount }) => {
  const isTwoColumns = items.length === 2;

  const { addItemToOrder } = useKioskStore((state) => ({
    addItemToOrder: state.addItemToOrder,
  }));

  const handleAddItem = (item: Item) => {
    addItemToOrder(item.id, 1);
  };

  return (
    <motion.div
      className="relative z-[30] w-full p-6 px-8 pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center">
        <motion.h2
          className="mr-2 font-baloo2 font-bold text-[30.96px]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        {discount && (
          <motion.span
            className="ml-2 rounded-full bg-lightGreen px-2 py-1 font-baloo2 font-bold text-[14.74px] text-black text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {`${discount} off`}
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
            isTwoColumns={isTwoColumns}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ItemList;
