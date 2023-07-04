import React from "react";
import Loader from "./Loader";

interface IProp {
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({
  disabled = false,
  isLoading = false,
  children,
  className = "",
  variant = "primary",
  ...rest
}: IProp & any) => {
  const buttonClasses = `btn btn-primary ${
    disabled ? "bg-gray-200 text-[#141414] opacity-60 cursor-not-allowed" : ""
  } ${!disabled && !isLoading ? "brightness-hover" : ""}`;

  const variantClass = {
    primary: `text-xs bg-equal-green transition-all duration-100 ${
      disabled ? "" : "hover:brightness-110"
    }  text-[#fff]`,
    secondary:
      "text-xs bg-[#fff] text-[#212121] hover:bg-gray-100 transition-all duration-100 border-[1px] border-[#212121]",
    danger:
      "text-xs bg-red-800 text-[#fff] hover:brightness-110 transition-all duration-100",
  };
  const buttonClass = `rounded px-[32px] py-[16px] font-[500] text-[18px] ${variantClass[variant]} ${buttonClasses} ${className}`;
  return (
    <button
      disabled={disabled || isLoading}
      className={`${buttonClass} ${disabled ? "hover:brightness-100" : ""}`}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader size={18} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
