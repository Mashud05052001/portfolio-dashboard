import { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type TModalContainerProps = {
  children: ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const ModalContainer = ({
  children,
  openModal,
  setOpenModal,
  className = "min-w-[90%] sm:min-w-[80%] lg:min-w-[70%]",
}: TModalContainerProps) => {
  return (
    <div
      onClick={() => {
        setOpenModal(false);
      }}
      className={`fixed z-[200] w-screen h-screen max-w-[1600px] mx-auto ${
        openModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`relative ${className} max-h-[90vh] overflow-y-auto rounded-lg bg-white p-10 drop-shadow-lg ${
          openModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <RxCross2
          onClick={() => {
            setOpenModal(false);
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
