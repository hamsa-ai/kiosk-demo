import type React from "react";
import { useKioskStore } from "@/store/kioskStore";
import { menuData } from "@/store/menuData";
import type { Category } from "@/store/types";

/**
 * Renders a single category card with its details.
 * @param {Object} props - The component props.
 * @param {Category} props.category - The category data.
 * @param {Function} props.onClick - Function to handle click events.
 * @component
 */
const CategoryCard: React.FC<{
  category: Category;
  onClick: (category: Category) => void;
}> = ({ category, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`relative min-h-[144.5px] cursor-pointer rounded-[18px] p-2 text-center shadow-lg transition-all duration-200 ease-in-out hover:scale-105 ${
        category.backgroundColor === "#000000" ? "text-white" : "text-gray-900"
      }`}
      style={{ backgroundColor: category.backgroundColor }}
    >
      {/* Category Image */}
      <img
        src={category.image}
        alt={category.name}
        className="mx-auto w-20 object-center"
      />
      {/* Category Name */}
      <p className="text-center font-baloo2 font-bold text-[14.74px]">
        {category.name}
      </p>
      {/* Discount Badge */}
      {category.discount && (
        <span className="rounded-full bg-lightGreen px-2 font-baloo2 font-semibold text-black text-sm">
          {category.discount}
        </span>
      )}
    </button>
  );
};

/**
 * Renders the list of categories with their respective details.
 * @component
 */
const CategoryList: React.FC = () => {
  // Access the necessary actions from Zustand store
  const { selectCategory, startComboOrder } = useKioskStore((state) => ({
    selectCategory: state.selectCategory,
    startComboOrder: state.startComboOrder,
  }));

  /**
   * Handles the click event when a category is selected.
   * @param {Category} category - The selected category.
   */
  const handleCategoryClick = (category: Category) => {
    if (category.id === "combo_meal") {
      startComboOrder(); // Start the combo order if the "Combo Meal" category is selected
    } else {
      selectCategory(category.id); // Otherwise, select the category
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5 bg-transparent p-4">
      <div className="-top-2 radial-gradient absolute right-0 h-[316.28px] w-[316.28px] p-4" />
      {menuData.categories.map((category: Category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={handleCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryList;
