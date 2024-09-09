import type React from "react";
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
      alt="Mascot"
      className={cn(className)}
      layoutId="mascot"
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    />
  );
};

export default Mascot;
