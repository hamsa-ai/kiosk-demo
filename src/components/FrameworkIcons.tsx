import type React from "react";
import ReactLogo from "@assets/logos/react.svg";

const FrameworkIcons: React.FC = () => {
  return (
    <div className="flex space-x-4 pl-8">
      <img src={ReactLogo} alt="React" className="h-10" />
    </div>
  );
};

export default FrameworkIcons;
