import { IoLogOutOutline } from "react-icons/io5";
import { userStore } from "../store";
import GenricLayout from "./GenricLayout";
export default function AppLayout({ children }) {
  const [logout] = userStore((state: any) => [state.logout]);
  return (
    <GenricLayout>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="h-[50px]  border-b-[1px] border-b-gray-200 flex items-center justify-between px-4 font-[500] text-[20px]">
            <div className="w-1 h-11" />
            <p>ID Wallets</p>
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
