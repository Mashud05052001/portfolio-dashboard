import { MouseEventHandler, ReactNode } from "react";

type TProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText?: string | ReactNode;
  className?: string;
};

export default function CommonButton({
  onClick,
  buttonText = "Submit",
  className,
}: TProps) {
  return (
    <button
      className={`flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
