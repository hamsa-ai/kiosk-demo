import React from "react";
import DeliciousSVG from "@assets/vectors/delicious.svg";

const DeliciousLogo: React.FC = () => {
	return (
		<img src={DeliciousSVG} alt='Delicious Logo' className='w-32 h-auto' />
	);
};

export default DeliciousLogo;
