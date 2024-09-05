import React from "react";
import MascotImage from "@assets/images/mascot.png";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MascotProps {
	className?: string;
}

const Mascot: React.FC<MascotProps> = ({ className }) => {
	return (
		<motion.img
			src={MascotImage}
			alt='Mascot'
			className={cn(className)}
			layoutId='mascot'
			transition={{
				type: "spring",
				duration: 1,
				bounce: 0.3,
			}}
		/>
	);
};

export default Mascot;
