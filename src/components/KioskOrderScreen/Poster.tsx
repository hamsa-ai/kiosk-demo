import type React from "react";
import FoodImage from "@assets/images/food.png";
import PosterOffer from "@assets/vectors/poster-offer.svg";
import { motion } from "framer-motion";
const Poster: React.FC = () => {
  return (
    <div className="h-full w-full rounded-lg bg-limeGreen">
      <div className="flex h-[308.9px] w-full items-center justify-center rounded-[0px_17.69px_17.69px_154.45px] bg-black ">
        <img
          src={PosterOffer}
          alt="Poster"
          className="-mt-[30px] w-[196.2px]"
        />
      </div>

      <motion.img
        layoutId="food-poster-image"
        src={FoodImage}
        alt="Food"
        className="-right-12 absolute bottom-0 z-30 h-auto w-[445.29px]"
      />
    </div>
  );
};

export default Poster;
