import { logo } from "../utils/assets";

export default function PoweredBy() {
  return (
    <div className="flex items-center gap-2">
      <p className="text-[14px]">powered by</p>
      <img src={logo} className="h-[15px]" />
    </div>
  );
}
