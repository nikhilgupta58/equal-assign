import Button from "../../components/Button";
import { useLoginContext } from "./utils/context";

export default function LoginView() {
  const { cards } = useLoginContext();
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="h-[50px] border-b-[1px] border-b-gray-200 flex items-center justify-center font-[500] text-[20px]">
          ID Wallets
        </div>
        <div className="p-4 flex flex-col gap-4">
          {cards?.map((row, id) => (
            <div
              key={id}
              className="py-8 px-6 shadow-md rounded-lg text-[14px] text-equal-green font-[500]"
            >
              {row.title}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[100px] border-t-[1px] border-b-gray-200 flex items-center justify-center font-[500] text-[20px]">
        <Button className="flex-grow mx-6">Login</Button>
      </div>
    </div>
  );
}
