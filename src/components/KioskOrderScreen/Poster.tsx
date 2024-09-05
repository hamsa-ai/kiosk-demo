import React from "react";
import FoodImage from "@assets/images/food.png";
import PosterOffer from "@assets/vectors/poster-offer.svg";
import { motion } from "framer-motion";
const Poster: React.FC = () => {
	return (
		<div className='w-full h-full bg-limeGreen rounded-lg'>
			<div className='w-full h-[340px] rounded-[0px_8px_24px_160.5px] bg-black flex justify-center items-center -mt-[0.5px] '>
				<img src={PosterOffer} alt='Poster' className='w-1/2' />
			</div>

			<motion.img
				layoutId='food-poster-image'
				src={FoodImage}
				alt='Food'
				className='absolute bottom-5 right-0 w-[420px] h-auto z-30'
			/>
		</div>
	);
};

export default Poster;
