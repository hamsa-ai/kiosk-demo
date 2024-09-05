import { useKioskStore } from "@/store/kioskStore";
import CategoryScreen from "./CategoryScreen";
import ItemAndCartScreen from "./ItemAndCartScreen";
import OrderCompletionScreen from "./OrderCompletionScreen";

const KioskOrderScreen: React.FC = () => {
	const { currentCategory, currentComboStep, isCompleted } = useKioskStore(
		(state) => ({
			currentCategory: state.currentCategory,
			currentComboStep: state.currentComboStep,
			isCompleted: state.isCompleted,
		})
	);

	if (isCompleted) {
		return (
			<div className='relative flex flex-col w-full h-full p-6 '>
				<OrderCompletionScreen />;
			</div>
		);
	}

	return (
		<div className='relative flex flex-col w-full h-full p-6 '>
			{/* Conditionally render either the category list or item/cart view based on the selected category or combo step */}
			{currentComboStep !== null ? (
				<ItemAndCartScreen isCombo={true} />
			) : currentCategory ? (
				<ItemAndCartScreen isCombo={false} />
			) : (
				<CategoryScreen />
			)}
		</div>
	);
};

export default KioskOrderScreen;
