import { jwtDecode } from "jwt-decode";
import { TTokenUser } from "../types";

export const decodeToken = (token: string) => {
  return jwtDecode<TTokenUser>(token);
};
