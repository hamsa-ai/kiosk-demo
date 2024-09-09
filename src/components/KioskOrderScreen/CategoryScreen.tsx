import { useKioskStore } from "@/store/kioskStore";
import DeliciousLogo from "../DeliciousLogo";
import CategoryList from "./CategoryList";
import Counter from "./Counter";
import Mascot from "./Mascot";
import Poster from "./Poster";

const CategoryScreen = () => {
  const currentOrder = useKioskStore((state) => state.currentOrder);

  return (
    <div className="relative flex h-full flex-row items-start justify-between">
      <div className="relative flex h-full w-3/5 flex-col justify-between bg-white p-6">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <DeliciousLogo className="w-[147.66px]" />
            <Counter itemCount={currentOrder.length} />
          </div>
          <h2 className="font-baloo2 font-normal text-3xl">
            <span className="font-baloo2 font-bold text-4xl">Hey,</span>
            <br />
            What’s up ?
          </h2>
        </div>

        <div className="relative z-[20]">
          <div className="absolute bottom-0 left-[-40px] z-[10]">
            <Mascot
              className={
                "relative bottom-[100px] left-[30%] h-[423.18px] w-[434.23px]"
              }
            />
          </div>
          <div className="relative z-[20] ">
            <CategoryList />
          </div>
        </div>
      </div>

      <div className="h-full w-2/5">
        <Poster />
      </div>
    </div>
  );
};

export default CategoryScreen;
