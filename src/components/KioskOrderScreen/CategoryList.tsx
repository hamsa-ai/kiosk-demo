import React from "react";
import { useKioskStore } from "@/store/kioskStore";
import { menuData } from "@/store/menuData";
import { Category } from "@/store/types";

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
			// Start the combo order if the "Combo Meal" category is selected
			startComboOrder();
		} else {
			// Otherwise, select the category
			selectCategory(category.id);
		}
	};

	return (
		<div className='grid grid-cols-3 gap-4 p-4 bg-transparent'>
			<div className='absolute -top-2 right-0 p-4 radial-gradient w-[380px] h-[380px]'></div>
			{menuData.categories.map((category: Category) => (
				<button
					key={category.id}
					onClick={() => handleCategoryClick(category)}
					className={`min-h-[144.5px] relative p-2 rounded-[18px] text-center shadow-lg transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 ${
						category.backgroundColor === "#000000"
							? "text-white"
							: "text-gray-900"
					}`}
					style={{ backgroundColor: category.backgroundColor }}
				>
					{/* Category Image */}
					<img
						src={category.image}
						alt={category.name}
						className='w-20 h-20 mx-auto'
					/>

					{/* Category Name */}
					<p className='font-baloo'>{category.name}</p>

					{/* Discount Badge */}
					{category.discount && (
						<span className='bg-lightGreen text-black text-sm font-semibold px-2 rounded-full font-baloo2'>
							{category.discount}
						</span>
					)}
				</button>
			))}
		</div>
	);
};

export default CategoryList;
