import React from "react";
import FrameworkIcons from "./FrameworkIcons";
import DownloadButton from "./DownloadButton";

const Footer: React.FC = () => {
	return (
		<footer className='flex justify-center items-center space-x-4 p-6 bg-gray-100'>
			<DownloadButton />
			<FrameworkIcons />
		</footer>
	);
};

export default Footer;
