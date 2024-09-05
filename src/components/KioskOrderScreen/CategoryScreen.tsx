import { useKioskStore } from "@/store/kioskStore";
import DeliciousLogo from "../DeliciousLogo";
import CategoryList from "./CategoryList";
import Counter from "./Counter";
import Mascot from "./Mascot";
import Poster from "./Poster";

// Category screen (default view when no category is selected)
const CategoryScreen = () => {
	const currentOrder = useKioskStore((state) => state.currentOrder);

	return (
		<div className='flex flex-row justify-between items-start h-full relative -right-[0.5px]'>
			<div className='w-3/5 h-full p-6 relative flex flex-col justify-between'>
				<div className='p-4'>
					<div className='flex justify-between items-center mb-4'>
						<DeliciousLogo />
						<Counter itemCount={currentOrder.length} />
					</div>
					<h2 className='font-baloo2 text-3xl font-normal'>
						<span className='font-baloo text-4xl'>Hey,</span>
						<br />
						What’s up ?
					</h2>
				</div>

				<div className='relative z-[20]'>
					<div className='absolute z-[10] bottom-0 left-[-40px]'>
						<Mascot
							className={"relative left-[17%] bottom-[35px]"}
						/>
					</div>
					<div className='relative z-[20] '>
						<CategoryList />
					</div>
				</div>
			</div>

			<div className='w-2/5 h-full pb-[2px]'>
				<Poster />
			</div>
		</div>
	);
};

export default CategoryScreen;
