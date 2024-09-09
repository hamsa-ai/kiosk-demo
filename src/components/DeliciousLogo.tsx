import type React from "react";
import DeliciousSVG from "@assets/vectors/delicious.svg";
import { cn } from "@/lib/utils";

interface DeliciousLogoProps {
  className?: string;
}

const DeliciousLogo: React.FC<DeliciousLogoProps> = ({ className }) => {
  return (
    <img
      src={DeliciousSVG}
      alt="Delicious Logo"
      className={cn("h-auto w-32", className)}
    />
  );
};

export default DeliciousLogo;
