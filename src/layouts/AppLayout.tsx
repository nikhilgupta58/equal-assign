import { IoLogOutOutline } from "react-icons/io5";
import { userStore } from "../store";
import { logo } from "../utils/assets";
import GenricLayout from "./GenricLayout";
export default function AppLayout({ children }) {
  const [logout] = userStore((state: any) => [state.logout]);
  return (
    <GenricLayout>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="my-4 border-b-[1px] border-b-gray-200 flex items-center justify-between px-4 font-[500] text-[20px]">
            <div className="w-1 h-11" />
            <div className="flex flex-col gap-3 pb-[20px]">
              <img src={logo} className="object-contain max-h-[37px]" />
              <p className="text-center">ID Wallets</p>
            </div>
            <IoLogOutOutline
              onClick={() => logout()}
              size={25}
              className="cursor-pointer"
            />
          </div>
          <div className="p-4 flex flex-col gap-4">{children}</div>
        </div>
      </div>
    </GenricLayout>
  );
}
