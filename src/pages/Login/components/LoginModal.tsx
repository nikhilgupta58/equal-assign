import React from "react";
import { FiPhone } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import PoweredBy from "../../../components/PoweredBy";
import useRequestToken from "../../../hooks/useRequestToken";
import useVerifyToken from "../../../hooks/useVerifyToken";
import { validatePhone } from "../../../utils/helper";
export default function LoginModal({ isOpen, onClose }) {
  const { mutate, isLoading, isSuccess } = useRequestToken();
  const { mutate: verifyMutate, isLoading: isVerifyLoading } = useVerifyToken();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [mobileOtp, setMobileOtp] = React.useState("");
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[450px] max-w-[100vw] max-h-[85vh]">
        <div className="py-6 border-b-[1px] px-4 border-b-gray-200 flex items-center justify-between">
          <div className="w-1 h-1" />
          <div className="flex items-center gap-2">
            <FiPhone />
            <p>Mobile Number</p>
          </div>
          <RxCross2
            onClick={onClose}
            size={22}
            color={"#BDC3C7"}
            className="cursor-pointer"
          />
        </div>
        {isSuccess ? (
          <div className="p-4">
            <input
              value={mobileOtp}
              onChange={(e) => {
                setMobileOtp(e.target.value);
              }}
              placeholder="Enter otp"
              type="number"
              className="p-2 bg-gray-50 w-full border-[1px] border-gray-100 appearance-none"
            />
            <p className="text-[12px] text-gray-400">
              Enter otp sent to {mobileNumber}
            </p>
            <Button
              isLoading={isVerifyLoading}
              onClick={() => verifyMutate({ mobileNumber, mobileOtp })}
              className="w-full mt-4"
              disabled={mobileOtp?.length !== 6}
            >
              Proceed
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-gray-50 flex items-center p-2 gap-2 rounded-t-xl border-b-[1px] border-[#000] px-3">
              <p>+91</p>
              <input
                onKeyDown={handleKeyDown}
                value={mobileNumber}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val?.length <= 10) setMobileNumber(e.target.value);
                }}
                placeholder="Enter your Mobile Number"
                type="number"
                className="p-2 bg-gray-50 flex-grow w-full border-[1px] border-gray-100 appearance-none outline-none border-none"
              />
            </div>
            <p className="text-[14px] mt-[1px] text-[#BDC3C7]">
              Enter your Mobile No. to Login
            </p>
            <div className="flex items-center justify-center flex-col gap-2">
              <Button
                isLoading={isLoading}
                onClick={() => mutate(mobileNumber)}
                className="mt-4 w-[90%]"
                disabled={!validatePhone(mobileNumber)}
              >
                Proceed
              </Button>
              <PoweredBy />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
