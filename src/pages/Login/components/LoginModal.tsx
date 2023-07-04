import React from "react";
import { FiPhone } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import useRequestToken from "../../../hooks/useRequestToken";
import useVerifyToken from "../../../hooks/useVerifyToken";
import { validatePhone } from "../../../utils/helper";
export default function LoginModal({ isOpen, onClose }) {
  const { mutate, isLoading, isSuccess } = useRequestToken();
  const { mutate: verifyMutate, isLoading: isVerifyLoading } = useVerifyToken();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [mobileOtp, setMobileOtp] = React.useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[450px] max-w-[85vw] max-h-[85vh]">
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
            <input
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
              placeholder="Enter phone number"
              type="number"
              className="p-2 bg-gray-50 w-full border-[1px] border-gray-100 appearance-none"
            />
            <p className="text-[12px] text-gray-400">Enter your no. to login</p>{" "}
            <Button
              isLoading={isLoading}
              onClick={() => mutate(mobileNumber)}
              className="w-full mt-4"
              disabled={!validatePhone(mobileNumber)}
            >
              Proceed
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
