import React from "react";
import { useKioskStore } from "@/store/kioskStore";
import DeliciousLogo from "../DeliciousLogo";
import Cart from "./Cart";
import Mascot from "./Mascot";
import ItemList from "./Itemlist";
import { motion } from "framer-motion";
import FoodImage from "@assets/images/food.png";

/**
 * The screen displaying the item list and cart.
 * It shows items from the selected category or combo step.
 *
 * @param {Object} props
 * @param {boolean} props.isCombo - Whether the user is in a combo flow.
 * @returns {JSX.Element} The rendered ItemAndCartScreen component.
 */
const ItemAndCartScreen: React.FC<{ isCombo: boolean }> = ({ isCombo }) => {
	const { currentCategory, getItemsForCurrentStep, removeCategory } =
		useKioskStore((state) => ({
			currentCategory: state.currentCategory,
			getItemsForCurrentStep: state.getItemsForCurrentStep,
			removeCategory: state.removeCategory, // Accessing removeCategory action
		}));

	const items = isCombo ? getItemsForCurrentStep() : currentCategory?.items;

	/**
	 * Handles the "Main menu" button click to reset the current category.
	 */
	const handleMainMenuClick = () => {
		removeCategory(); // Call removeCategory to reset the current category
	};

	return (
		<div className='flex flex-col h-full bg-gray-100 '>
			<div className='flex'>
				{/* Left Column */}
				<div className='w-3/4 h-full flex flex-col'>
					<header className='flex justify-between items-center p-4 bg-white'>
						<DeliciousLogo />
						<button
							className='bg-gray-100 px-4 py-2 rounded-full text-gray-700'
							onClick={handleMainMenuClick} // Handle main menu click
						>
							Main menu?
						</button>
					</header>
					<div className='flex-grow p-4 overflow-y-auto'>
						<ItemList
							items={items || []}
							title={
								isCombo
									? "Combo Meals"
									: currentCategory?.name || ""
							}
							discount={isCombo ? "20% off" : undefined}
						/>
					</div>
				</div>

				{/* Right Column */}
				<div className='w-1/4 h-full p-4 flex flex-col'>
					<Cart />
				</div>
			</div>
			<div className='flex justify-between w-full'>
				<motion.img
					layoutId='food-poster-image'
					transition={{
						type: "spring",
						duration: 1,
						bounce: 0.3,
					}}
					src={FoodImage}
					alt='Food'
					className='w-[340.05px] h-[244px] relative left-[-20%]'
				/>
				<Mascot className={"w-[600px] relative left-[34.5%]"} />
			</div>
		</div>
	);
};

export default ItemAndCartScreen;
