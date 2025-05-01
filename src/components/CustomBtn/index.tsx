"use client";
import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  height?: string;
  width?: string;
  className?: string;
  hoverBgColor?: string;
  type?: "button" | "submit" | "reset";
};

const CustomBtn: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  height = "h-10",
  width = "w-auto",
  className = "",
  hoverBgColor = "hover:bg-blue-600",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 rounded-md ${bgColor} ${textColor} ${height} ${width} ${className} ${hoverBgColor}`}
      type={type}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default CustomBtn;
