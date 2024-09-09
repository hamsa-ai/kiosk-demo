import type React from "react";
import { useKioskStore } from "@/store/kioskStore";
import DeliciousLogo from "../DeliciousLogo";
import useVoiceAgent from "@/voice-agent/useVoiceAgent";

const OrderCompletionScreen: React.FC = () => {
  const { startAgent } = useVoiceAgent();
  const resetOrder = useKioskStore((state) => state.resetOrder);
  const { removeCategory } = useKioskStore((state) => ({
    removeCategory: state.removeCategory,
  }));

  const handleNewOrderClick = () => {
    resetOrder(); // Resets the order and isCompleted flag
    removeCategory();
    startAgent();
  };

  return (
    <div className="relative flex h-full flex-col items-start justify-between overflow-hidden bg-white p-8">
      <DeliciousLogo className="w-[147.66px]" />
      <button
        className="relative z-[40] ml-auto rounded-[58.98px] bg-limeGreen2 px-6 py-2 font-baloo2 font-semibold text-black"
        type="button"
        onClick={handleNewOrderClick}
      >
        New Order?
      </button>
    </div>
  );
};

export default OrderCompletionScreen;
