import Button from "../../components/Button";
import { logo } from "../../utils/assets";
import { useLoginContext } from "./utils/context";

export default function LoginView() {
  const { cards, setIsOpen } = useLoginContext();
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="border-b-[1px] my-4 gap-3 pb-[20px] border-b-gray-200 flex flex-col items-center justify-center font-[400] text-[20px]">
          <img src={logo} className="object-contain max-h-[37px]" />
          <p>ID Wallets</p>
        </div>
        <div className="py-4 px-[30px] flex flex-col gap-[25px]">
          {cards?.map((row, id) => (
            <div
              key={id}
              className="px-6 card-shadow flex items-end justify-between rounded-xl text-[16px] text-equal-green font-[500]"
            >
              <p className="leading-[80px]">{row.title}</p>
              <img src={row.img} className="w-auto h-[60px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-[1px] border-b-gray-200 flex flex-col items-center pt-4 pb-2 justify-center gap-3 font-[500] text-[20px]">
        <Button
          onClick={() => setIsOpen(true)}
          className="flex-grow text-[20px] w-[80%]"
        >
          LOGIN
        </Button>
        <div className="flex items-center gap-2">
          <p className="text-[14px]">powered by</p>
          <img src={logo} className="h-[15px]" />
        </div>
      </div>
    </div>
  );
}
