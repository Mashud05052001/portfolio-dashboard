import { selectCurrentToken } from "../redux/features/auth/auth.slice";
import { useAppSelector } from "../redux/hook";
import { TTokenUser } from "../types";
import { decodeToken } from "../utils/decodeToken";

const useUserInfoFromToken = () => {
  const userToken = useAppSelector(selectCurrentToken);
  let userInfo: TTokenUser | null = null;
  if (userToken) {
    userInfo = decodeToken(userToken);
  }
  if ((userInfo as TTokenUser)?.email) {
    return userInfo;
  }
  return null;
};

export default useUserInfoFromToken;
