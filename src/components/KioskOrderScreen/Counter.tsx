import type React from "react";

interface CounterProps {
  itemCount: number;
}

const Counter: React.FC<CounterProps> = ({ itemCount }) => {
  return (
    <div className="flex h-[27.95px] w-[27.95px] items-center justify-center rounded-full bg-black p-1 font-baloo2 font-bold text-[14.74px] text-white">
      {itemCount}
    </div>
  );
};

export default Counter;
