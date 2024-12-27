import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUserInfoFromToken from "../hook/useUserInfoFromToken";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userInfo = useUserInfoFromToken();
  if (!userInfo?.email) {
    console.log("Authentication failed. Please login first");
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
