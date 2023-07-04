import React from "react";
import { BsPencil } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import PoweredBy from "../../../components/PoweredBy";
import useRequestToken from "../../../hooks/useRequestToken";
import useVerifyToken from "../../../hooks/useVerifyToken";
import { validatePhone } from "../../../utils/helper";

export default function LoginModal({ isOpen, onClose }) {
  const { mutate, isLoading, isSuccess, isError } = useRequestToken();
  const {
    mutate: verifyMutate,
    isLoading: isVerifyLoading,
    isError: isVerifyError,
  } = useVerifyToken();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [mobileOtp, setMobileOtp] = React.useState("");
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };
  const [error, setError] = React.useState("");
  const [enterOtp, setEnterOtp] = React.useState(false);
  const [sendPhoneOtpAgain, setSendPhoneOtpAgain] = React.useState(0);
  const [phoneOtpTimer, setPhoneOtpTimer] = React.useState(null);

  React.useEffect(() => {
    if (isSuccess) {
      setEnterOtp(true);
      setSendPhoneOtpAgain(30);
    }
  }, [isSuccess]);

  React.useEffect(() => {
    setError(isError);
  }, [isError]);

  React.useEffect(() => {
    setError(isVerifyError);
  }, [isVerifyError]);

  React.useEffect(() => {
    if (sendPhoneOtpAgain === 30) {
      setPhoneOtpTimer(
        setInterval(() => {
          setSendPhoneOtpAgain((prev) => prev - 1);
        }, 1000)
      );
    }
    if (sendPhoneOtpAgain === 0) {
      if (phoneOtpTimer) {
        clearInterval(phoneOtpTimer);
      }
      setSendPhoneOtpAgain(0);
    }
  }, [sendPhoneOtpAgain]);

  const sendOtp = () => {
    mutate(mobileNumber);
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
        {enterOtp ? (
          <div className="p-4 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-[14px] mt-[1px] text-[#BDC3C7]">
                Enter OTP sent to {mobileNumber}
              </p>
              <BsPencil
                onClick={() => {
                  setEnterOtp(false);
                  setError("");
                }}
                cursor="pointer"
              />
            </div>
            <div
              className="bg-gray-100 flex items-center px-[10px] w-full py-[4px] gap-2 rounded-t-xl border-b-[1px] border-[#000] text-[14px]"
              style={{ letterSpacing: "2px" }}
            >
              <input
                onKeyDown={handleKeyDown}
                value={mobileOtp}
                style={{ letterSpacing: "2px" }}
                onChange={(e) => {
                  setError("");
                  const val = e.target.value;
                  if (val?.length <= 6) setMobileOtp(e.target.value);
                }}
                placeholder="Enter OTP"
                type="number"
                className="p-2 bg-gray-100 flex-grow w-full border-[1px] border-gray-100 appearance-none outline-none border-none"
              />
            </div>
            {error ? (
              <p className="text-[14px] w-full text-red-500">{error}</p>
            ) : null}
            <div className="mt-[1px] text-[14px]">
              <p>
                {`${sendPhoneOtpAgain ? "Resend in " : "To Resend OTP "}`}
                {sendPhoneOtpAgain > 0 ? (
                  <span className="underline">
                    00:
                    {sendPhoneOtpAgain > 9
                      ? sendPhoneOtpAgain
                      : `0${sendPhoneOtpAgain}`}
                  </span>
                ) : (
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      sendOtp();
                    }}
                  >
                    Click Here
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div
              className="bg-gray-100 flex items-center px-[10px] py-[4px] gap-2 rounded-t-xl border-b-[1px] border-[#000] text-[14px]"
              style={{ letterSpacing: "2px" }}
            >
              <p>+91</p>
              <input
                onKeyDown={handleKeyDown}
                value={mobileNumber}
                style={{ letterSpacing: "2px" }}
                onChange={(e) => {
                  setError("");
                  const val = e.target.value;
                  if (val?.length <= 10) setMobileNumber(e.target.value);
                }}
                placeholder="Enter your Mobile Number"
                type="number"
                className="p-2 bg-gray-100 flex-grow w-full border-[1px] border-gray-100 appearance-none outline-none border-none"
              />
            </div>
            {error ? (
              <p className="text-[14px] mt-[1px] text-red-500">{error}</p>
            ) : (
              <p className="text-[14px] mt-[1px] text-[#BDC3C7]">
                Enter your Mobile No. to Login
              </p>
            )}
          </div>
        )}
        <div className="flex items-center justify-center flex-col gap-2 py-2">
          <Button
            isLoading={isLoading || isVerifyLoading}
            onClick={() => {
              if (enterOtp) {
                verifyMutate({ mobileNumber, mobileOtp });
              } else {
                sendOtp();
              }
            }}
            className="mt-[1px] w-[90%]"
            disabled={
              enterOtp ? mobileOtp?.length !== 6 : !validatePhone(mobileNumber)
            }
          >
            PROCEED
          </Button>
          <PoweredBy />
        </div>
      </div>
    </Modal>
  );
}

// isLoading={isVerifyLoading}
// onClick={() => verifyMutate({ mobileNumber, mobileOtp })}
// className="w-full mt-4"
// disabled={mobileOtp?.length !== 6}
