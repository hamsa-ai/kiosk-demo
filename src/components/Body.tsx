import type React from "react";
import DeliciousLogo from "./DeliciousLogo";
import { motion } from "framer-motion";

interface BodyProps {
  handleDemoStart: (language: "ar" | "en") => void;
}

const Body: React.FC<BodyProps> = ({ handleDemoStart }) => {
  return (
    <div className="space-y-6 py-4 pl-10 text-left font-baloo2 text-black leading-tight">
      <DeliciousLogo className="w-[138.47px]" />
      <h1 className="font-normal text-[32.25px]">
        <span className="font-bold text-[48px]">Experience the Future</span>
        <br />
        of dining with our voice-activated kiosk.
      </h1>
      <p className="font-normal text-[23.25px]">
        Just speak your order and enjoy a hassle-free meal at Hamsa Bite!
      </p>
      <div className="mt-2 flex items-center justify-start gap-4">
        <motion.button
          type="button"
          className="h-[45px] w-[98px] rounded-full bg-limeGreen2 font-baloo2 text-[15px] text-black"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          onClick={() => handleDemoStart("en")}
        >
          {"English"}
        </motion.button>
        <motion.button
          type="button"
          className="h-[45px] w-[98px] rounded-full bg-black font-baloo2 text-[15px] text-white "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          onClick={() => handleDemoStart("ar")}
        >
          {"العربية"}
        </motion.button>
      </div>
    </div>
  );
};

export default Body;
