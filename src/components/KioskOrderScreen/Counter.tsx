import React from "react";

interface CounterProps {
	itemCount: number;
}

const Counter: React.FC<CounterProps> = ({ itemCount }) => {
	return (
		<div className='flex justify-center items-center bg-black p-1 rounded-full w-8 h-8 text-white font-bold'>
			{itemCount}
		</div>
	);
};

export default Counter;
