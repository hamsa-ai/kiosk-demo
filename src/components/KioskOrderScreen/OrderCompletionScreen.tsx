import React from "react";
import { useKioskStore } from "@/store/kioskStore";

const OrderCompletionScreen: React.FC = () => {
	const resetOrder = useKioskStore((state) => state.resetOrder);
	const { removeCategory } = useKioskStore((state) => ({
		removeCategory: state.removeCategory,
	}));

	const handleNewOrderClick = () => {
		resetOrder(); // Resets the order and isCompleted flag
		removeCategory();
	};

	return (
		<div className='flex flex-col items-center justify-center h-full bg-white z-20'>
			<h1 className='text-2xl font-bold mb-4'>
				Your order is being prepared!
			</h1>
			<p className='text-lg mb-6'>
				Thank you for your order. We are working on it!
			</p>
			<button
				className='bg-green-500 text-white py-2 px-6 rounded-lg font-bold'
				onClick={handleNewOrderClick}
			>
				New Order
			</button>
		</div>
	);
};

export default OrderCompletionScreen;
