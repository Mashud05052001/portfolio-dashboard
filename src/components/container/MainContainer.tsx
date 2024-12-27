import { TChildren } from "../../types";

const MainContainer = ({ children, className }: TChildren) => {
  return <div className={`${className} max-w-7xl mx-auto `}>{children}</div>;
};

export default MainContainer;
