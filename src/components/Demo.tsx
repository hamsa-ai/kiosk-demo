import React from "react";
import Ipad from "@assets/images/ipad.png";
import Kiosk from "@assets/vectors/kiosk.svg";
import KioskOrderScreen from "./KioskOrderScreen/KioskOrderScreen";
import { useKioskStore } from "@/store/kioskStore";

const Demo: React.FC = () => {
	// Access state from Zustand store
	const currentCategory = useKioskStore((state) => state.currentCategory);
	const currentComboStep = useKioskStore((state) => state.currentComboStep);

	// Determine if the kiosk should be shown based on category and combo state
	const shouldShowKiosk = !currentCategory && currentComboStep === null;

	return (
		<div className='relative flex justify-center items-center w-full h-screen overflow-hidden bg-gray-100'>
			{/* Wrapper for centering both iPad and Kiosk */}
			<div className='relative flex justify-center items-center'>
				{/* Inner wrapper for proper alignment */}
				<div className='relative flex items-center'>
					{/* iPad Image */}
					<div className='relative flex justify-center items-center w-[1000px] mx-auto'>
						<img
							src={Ipad}
							alt='iPad'
							className='absolute w-full bg-white rounded-[55px]'
						/>

						<div className='h-[648px] w-[97%] rounded-[3rem] flex justify-center items-center'>
							<KioskOrderScreen />
						</div>
					</div>

					{/* Kiosk Image */}
					<div className='ml-[-120px]'>
						{shouldShowKiosk ? (
							<img
								src={Kiosk}
								alt='Kiosk'
								className='relative w-[254px] h-auto z-[30]'
							/>
						) : (
							<div className='relative w-[254px] h-auto z-[30]'></div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Demo;
