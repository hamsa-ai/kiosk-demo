import React from "react";
import { useKioskStore } from "@/store/kioskStore";
import { Item } from "@/store/types";

interface ItemListProps {
	items: Item[];
	title: string;
	discount?: string;
}

const ItemList: React.FC<ItemListProps> = ({ items, title, discount }) => {
	const addItemToOrder = useKioskStore((state) => state.addItemToOrder);
	const nextComboStep = useKioskStore((state) => state.nextComboStep);
	const currentComboStep = useKioskStore((state) => state.currentComboStep);

	const isComboActive = currentComboStep !== null;

	const handleAddItem = (item: Item) => {
		addItemToOrder(item.id, 1);

		if (isComboActive) {
			nextComboStep();
		}
	};

	return (
		<div className='w-full'>
			<div className='flex items-center mb-4'>
				<h2 className='text-2xl font-bold mr-2'>{title}</h2>
				{discount && (
					<span className='bg-green-500 text-white px-2 py-1 rounded-full text-sm'>
						{discount}
					</span>
				)}
			</div>
			<div className='grid grid-cols-3 gap-4'>
				{items.map((item) => (
					<button
						key={item.id}
						className='bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer flex flex-col items-center justify-between h-full'
						onClick={() => handleAddItem(item)}
					>
						<img
							src={item.image}
							alt={item.name}
							className='w-12 h-12 object-contain mb-2'
						/>
						<div>
							<p className='text-lg font-semibold text-gray-800 mb-1'>
								{item.name}
							</p>
							{/* <p className='text-sm text-gray-500 mb-2'>
								{item.weight}g
							</p> */}
							<p className='text-xl font-bold text-green-500'>
								${item.price.toFixed(2)}
							</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default ItemList;
