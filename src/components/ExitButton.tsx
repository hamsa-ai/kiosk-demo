import type React from "react";
import { motion } from "framer-motion";
import ExitSVG from "@assets/vectors/exit.svg";

const ExitButton: React.FC = () => {
  return (
    <motion.button
      className="absolute top-1/2 left-0 z-[60] flex h-[40.33px] w-[73.5px] items-center justify-between rounded-r-[23.25px] bg-black px-1 text-white transition-colors duration-300 ease-in-out"
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, x: -2 }}
    >
      {/* Animated Span for Text */}
      <motion.span className="mx-1 font-baloo text-[13.5px]">Exit</motion.span>

      {/* Container for the Exit SVG */}
      <div className="mr-0.5 flex h-[31.22px] w-[31.22px] items-center justify-center rounded-full bg-white p-1 text-black">
        <img src={ExitSVG} alt="exit" />
      </div>
    </motion.button>
  );
};

export default ExitButton;
