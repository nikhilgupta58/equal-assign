import React from "react";

interface IProp {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose, ...props }: IProp) {
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [isOpen]);
  return (
    <>
      <div
        className={`fixed w-screen h-screen top-0 left-0 opacity-50 bg-gray-900 rounded-md ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed flex flex-col bg-white opacity-100 rounded-md rounded-8 border-1 border-solid border-gray-200 justify-center items-center ${
          isOpen ? "block" : "hidden"
        }`}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
