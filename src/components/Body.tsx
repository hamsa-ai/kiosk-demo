import type React from "react";
import DeliciousLogo from "./DeliciousLogo";

const Body: React.FC = () => {
  return (
    <div className="space-y-6 py-4 pl-10 text-left font-baloo2 text-black leading-tight">
      <DeliciousLogo className="w-[138.47px]" />
      <h1 className=" font-normal text-[32.25px]">
        <span className="font-bold text-[48px]">Experience the Future</span>
        <br />
        of dining with our voice-activated kiosk.
      </h1>
      <p className="font-normal text-[23.25px] ">
        Just speak your order and enjoy a hassle-free meal at Hamsa Bite!
      </p>
    </div>
  );
};

export default Body;
