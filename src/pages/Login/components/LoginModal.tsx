import React from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import useRequestToken from "../../../hooks/useRequestToken";
import { validatePhone } from "../../../utils/helper";

export default function LoginModal({ isOpen, onClose }) {
  const { mutate, isLoading, isSuccess } = useRequestToken();
  const [mobileNumber, setMobileNumber] = React.useState("");

  React.useEffect(() => {
    if (isSuccess) console.log(isSuccess);
  }, [isSuccess]);

  const RequestOtp = () => {
    return (
      <div className="p-4">
        <input
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
          }}
          placeholder="Enter phone number"
        //   type="number"
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
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] max-w-[85vw] max-h-[85vh]">
        <div className="py-4 border-b-[1px] px-4 border-b-gray-200 flex items-center justify-between">
          <div className="w-1 h-1" />
          <p>Mobile Number</p>
          <RxCross2 onClick={onClose} />
        </div>
        <RequestOtp />
      </div>
    </Modal>
  );
}
