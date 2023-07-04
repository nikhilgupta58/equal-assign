import React from "react";
import { RxCross2 } from "react-icons/rx";
import { toastStore } from "../store";
const commonClass = {
  parent:
    "fixed min-h-[52px] max-w-[60vw] w-[400px] shadow-lg py-[22px] px-[20px] rounded-[6px] top-2 right-2 z-[1000] flex justify-between items-center gap-[20px]",
  child: "flex gap-[12px] d-body3  items-center",
};

export default function Toast() {
  const [data, clear] = toastStore((state) => [state.data, state.clear]);

  const clearToast = () => {
    clear();
  };

  React.useEffect(() => {
    if (data) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        clearToast();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const messaage = typeof data === "string" ? data : "Internal Server Error";

  if (!data) return null;

  return (
    <div className={`bg-[#FFF1F0] ${commonClass.parent}`}>
      <div className={`text-[#E02B1D] ${commonClass.child}`}>
        <RxCross2 size={20} />
        <p>{messaage}</p>
      </div>
      <RxCross2 onClick={clearToast} size={20} color="#4D4D4D" />
    </div>
  );
}
