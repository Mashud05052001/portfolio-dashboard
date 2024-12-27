import { ReactNode } from "react";

type TFormButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
};
const OutlineButton = ({
  children = "Submit",
  isLoading,
  type = "submit",
  className,
}: TFormButtonProps) => {
  return (
    <button
      className={`${className} rounded-md py-1 transition-colors border-2 w-full border-[#003669] hover:bg-[#054a8a] duration-150 text-[#003669] hover:text-white ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
      }`}
      disabled={isLoading}
      type={type}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
