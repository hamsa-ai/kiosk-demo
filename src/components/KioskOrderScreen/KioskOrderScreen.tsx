import { useKioskStore } from "@/store/kioskStore";
import CategoryScreen from "./CategoryScreen";
import ItemAndCartScreen from "./ItemAndCartScreen";
import OrderCompletionScreen from "./OrderCompletionScreen";

const KioskOrderScreen: React.FC = () => {
  const { currentCategory, isCompleted } = useKioskStore((state) => ({
    currentCategory: state.currentCategory,
    isCompleted: state.isCompleted,
  }));

  if (isCompleted) {
    return (
      <div className="h-full w-full p-6 ">
        <OrderCompletionScreen />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col p-6 ">
      {/* Conditionally render either the category list or item/cart view based on the selected category */}
      {currentCategory ? <ItemAndCartScreen /> : <CategoryScreen />}
    </div>
  );
};

export default KioskOrderScreen;
