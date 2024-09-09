import type React from "react";
import { motion } from "framer-motion";
import GithubLogo from "@assets/logos/github.svg";

const DownloadButton: React.FC = () => {
  return (
    <motion.a
      href="https://github.com/hamsa-ai/kiosk-demo"
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-[56.25px] w-[248.25px] cursor-pointer items-center justify-center space-x-2 overflow-hidden rounded-[10.5px] bg-black px-10 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
      />
      <motion.img
        src={GithubLogo}
        alt="GitHub"
        className="relative h-6 w-6 rounded-full bg-black"
      />
      <motion.span
        className="group-hover:!text-black relative font-baloo2 font-medium text-[15px] leading-tight"
        initial={{ color: "#ffffff" }}
        whileHover={{ color: "#000000" }}
      >
        Download The Code From Github
      </motion.span>
    </motion.a>
  );
};

export default DownloadButton;
