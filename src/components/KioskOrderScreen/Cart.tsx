import type React from "react";
import { useKioskStore } from "@/store/kioskStore";
import Counter from "./Counter";
import { cn, getItemImage } from "@/lib/utils";
import EmptyCart from "@assets/vectors/empty-cart.svg";
import useVoiceAgent from "@/voice-agent/useVoiceAgent";

/**
 * CartItemCard component to render an individual item in the cart.
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Item ID
 * @param {string} props.name - Item name
 * @param {number} props.price - Item price
 * @param {number} props.quantity - Item quantity
 */
const CartItemCard: React.FC<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}> = ({ id, name, price, quantity }) => {
  return (
    <div className="relative mb-2 flex items-center rounded-[13.27px] bg-white p-2 shadow-default">
      <div
        className={cn(
          "-right-[10px] -top-[6px] absolute flex min-h-[26.54px] min-w-[26.54px] items-center justify-center rounded-full bg-limeGreen2 px-1",
          quantity === 1 && "hidden",
        )}
      >
        <p className="font-baloo2 font-bold text-[14.74px] text-white">
          {`x${quantity}`}
        </p>
      </div>
      <img
        src={getItemImage(id)}
        alt={name}
        className="mr-2 h-12 w-12 object-contain"
      />
      <div className="flex flex-grow flex-col items-start">
        <div className="">
          <p className="font-baloo2 font-bold text-[14.74px]">{name}</p>
        </div>
        <div className="flex w-full items-start justify-between pr-4">
          <p className={"font-baloo2 font-bold text-[11.06px] text-black/50"}>
            {"150g"}
          </p>
          <p className="font-baloo2 font-bold text-[14.74px] text-limeGreen2">{`$${price.toFixed(
            2,
          )}`}</p>
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const currentOrder = useKioskStore((state) => state.currentOrder);
  const showOrderSummary = useKioskStore((state) => state.showOrderSummary);
  const completeOrder = useKioskStore((state) => state.completeOrder);
  const { total, itemsTotal, deliveryCost } = showOrderSummary();
  const { endAgent } = useVoiceAgent();

  /**
   * Handles the "Complete order" button click.
   */
  const handleCompleteOrderClick = () => {
    completeOrder();
    endAgent();
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-lightGray pt-[55px]">
      <div className="mb-6 flex items-center justify-between px-6">
        <h2 className="font-baloo2 font-bold text-[14.74px]">Your Cart</h2>
        <Counter itemCount={currentOrder.length} />
      </div>

      {currentOrder.length > 0 ? (
        <>
          <div className="flex-grow space-y-3 overflow-auto px-5 py-2 ">
            {currentOrder.map((item) => (
              <CartItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="px-6 pb-6">
            <p className="font-baloo2 font-bold text-[24.33px] text-black">
              {`$${itemsTotal}`}
            </p>
            <p className="font-baloo2 font-bold text-[8.11px] text-black/50 leading-[15px]">
              Delivery fees
              <br />
              <span className="text-[15px]">{`$${deliveryCost}`}</span>
            </p>
            <p className="font-baloo2 font-bold text-[31.7px] text-limeGreen2">
              {`$${total}`}
            </p>

            <button
              className="relative z-[40] rounded-[58.98px] bg-limeGreen2 px-6 py-2 font-baloo2 font-semibold text-black"
              type="button"
              onClick={handleCompleteOrderClick}
            >
              Complete order
            </button>
          </div>
        </>
      ) : (
        <div className="m-auto">
          <img
            src={EmptyCart}
            alt="Empty Cart"
            className="h-[175px] w-[175px]"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
