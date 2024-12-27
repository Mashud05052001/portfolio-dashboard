import { ReactNode } from "react";

type TFormButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
};
const FilledButton = ({
  disabled = false,
  isLoading = false,
  type = "submit",
  className,
  children = "Submit",
}: TFormButtonProps) => {
  return (
    <button
      className={`${className} rounded-md px-10 py-2 text-white transition-colors bg-[#003669] hover:bg-[#054a8a] duration-150
    ${
      isLoading
        ? "opacity-50 cursor-wait"
        : disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
    }`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default FilledButton;
