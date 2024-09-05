import React from "react";
import HamsaLogo from "@assets/logos/hamsa.svg";

const Header: React.FC = () => {
	return (
		<header className='flex justify-between items-center'>
			<div className='flex items-center space-x-2'>
				<img src={HamsaLogo} alt='Logo' className='h-10' />
			</div>
		</header>
	);
};

export default Header;
