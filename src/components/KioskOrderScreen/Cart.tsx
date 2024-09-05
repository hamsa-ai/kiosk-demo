import React from "react";
import { useKioskStore } from "@/store/kioskStore";
import Counter from "./Counter";
import { getItemImage } from "@/lib/utils";

const Cart: React.FC = () => {
	const currentOrder = useKioskStore((state) => state.currentOrder);
	const showOrderSummary = useKioskStore((state) => state.showOrderSummary);
	const completeOrder = useKioskStore((state) => state.completeOrder); // Get completeOrder from the store
	const { total } = showOrderSummary();

	/**
	 * Handles the "Complete order" button click.
	 */
	const handleCompleteOrderClick = () => {
		completeOrder(); // Complete the order and set the isCompleted flag
	};

	return (
		<div className='bg-gray-50 p-4 rounded-lg shadow-md h-full flex flex-col'>
			<div className='flex justify-between items-baseline'>
				<h2 className='text-xl font-bold mb-4'>Your Cart</h2>
				<Counter itemCount={currentOrder.length} />
			</div>

			<div className='flex-grow overflow-y-auto max-h-[300px]'>
				{currentOrder.map((item) => (
					<div
						key={item.id}
						className='flex items-center mb-2 bg-white p-2 rounded-lg'
					>
						<img
							src={getItemImage(item.id)}
							alt={item.name}
							className='w-12 h-12 object-contain mr-2'
						/>
						<div className='flex-grow'>
							<p className='font-semibold'>{item.name}</p>
						</div>
						<p className='font-bold text-green-500'>
							{`$${item.price.toFixed(2)}`}
						</p>
					</div>
				))}
			</div>
			<div className='mt-4'>
				<div className='flex justify-between items-center mb-2'>
					<p className='text-gray-600'>Subtotal</p>
					<p className='font-bold'>{`$${total}`}</p>
				</div>
				<button
					className='w-full bg-green-500 text-white py-2 rounded-lg font-bold'
					onClick={handleCompleteOrderClick} // Complete the order
				>
					Complete order
				</button>
			</div>
		</div>
	);
};

export default Cart;
