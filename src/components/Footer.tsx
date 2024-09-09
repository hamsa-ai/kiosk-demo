import type React from "react";
import FrameworkIcons from "./FrameworkIcons";
import DownloadButton from "./DownloadButton";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-start space-x-4 pl-10 ">
      <DownloadButton />
      <FrameworkIcons />
    </footer>
  );
};

export default Footer;
