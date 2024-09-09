import type React from "react";
import HamsaLogo from "@assets/logos/hamsa.svg";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={HamsaLogo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
