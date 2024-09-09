import { useState } from "react";
import Kiosk from "@assets/vectors/kiosk.svg";
import KioskOrderScreen from "./KioskOrderScreen/KioskOrderScreen";
import { useKioskStore } from "@/store/kioskStore";
import { AnimatePresence, motion } from "framer-motion";
import Mascot from "./KioskOrderScreen/Mascot";
import FoodImage from "@assets/images/food.png";
import { cn } from "@/lib/utils";
import useVoiceAgent from "@/voice-agent/useVoiceAgent";

export default function Demo() {
  const { startAgent } = useVoiceAgent();
  const [isOpen, setIsOpen] = useState(false);
  const { currentCategory, currentComboStep, isCompleted } = useKioskStore(
    (state) => ({
      currentCategory: state.currentCategory,
      currentComboStep: state.currentComboStep,
      isCompleted: state.isCompleted,
    }),
  );

  const isCategoryList = !currentCategory && currentComboStep === null;

  const handleIpadClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      startAgent();
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        isOpen && "z-[90]",
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 bg-white bg-opacity-50"
          />
        )}
      </AnimatePresence>
      <div className="relative z-20 flex w-full items-center justify-center">
        <motion.div
          className={cn("ipad-wrapper max-w-[970px] cursor-pointer")}
          onClick={handleIpadClick}
          animate={{ x: isOpen ? 0 : "67%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-[3rem]",
              !isOpen && "pointer-events-none",
            )}
          >
            <KioskOrderScreen />
            <motion.div
              className={cn(
                "absolute z-30 flex items-center justify-center",
                !isCategoryList && "hidden",
              )}
              initial={{
                opacity: 0,
              }}
              animate={{
                x: isOpen ? "500px" : "-550px",
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <img
                src={Kiosk}
                alt="Kiosk"
                className="relative z-[30] h-auto w-[254px]"
              />
            </motion.div>
          </div>
          {!isCategoryList && (
            <div className="-bottom-[250px] absolute z-10 flex w-full justify-between">
              <motion.img
                layoutId="food-poster-image"
                src={FoodImage}
                alt="Food"
                className={cn(
                  "-left-[200px] relative h-[238.87px] w-[308.94px]",
                  isCompleted ? "-left-[210px]" : "-left-[200px]",
                )}
                animate={{ x: isOpen ? 0 : "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              />
              <motion.div
                animate={{ x: isOpen ? 0 : "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {!isCompleted ? (
                  <Mascot className="-right-[330px] relative top-[125px] h-[701.85px] w-[720.28px]" />
                ) : (
                  <Mascot className="-top-[200px] relative right-[200px] h-[604.54px] w-[620.02px]" />
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
