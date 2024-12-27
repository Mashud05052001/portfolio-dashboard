import { TChildren } from "../../types";

export default function CenterContainer({ children, className }: TChildren) {
  return (
    <div
      className={`mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      {children}
    </div>
  );
}
