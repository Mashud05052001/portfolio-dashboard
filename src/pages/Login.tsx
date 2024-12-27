import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FilledButton from "../components/button/FilledButton";
import CenterContainer from "../components/container/CenterContainer";
import PForm from "../components/form/PForm";
import PInput from "../components/form/PInput";
import { loginValidationSchema } from "../schema/schema";
import { useLoginMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/hook";
import { toast } from "sonner";
import { TError, TResponseData } from "../types";
import { decodeToken } from "../utils/decodeToken";
import { setUser, TAuthState } from "../redux/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Logging in...");
    try {
      const result = (await loginUser(data).unwrap()) as TResponseData<string>;
      if (result?.success) {
        const token = result?.data;
        const user = decodeToken(token);
        const authData: TAuthState = { token, user };
        dispatch(setUser(authData));
        toast.success("Login successfull", { id: loadingId });
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        (error as TError)?.data?.message ||
        "Something went wrong. Please try again";
      toast.error(`Failed. ${errorMessage}`, { id: loadingId });
    }
  };

  return (
    <div>
      <h1 className="absolute left-1/2 -translate-x-1/2 top-28 text-2xl font-semibold">
        Welcome To Mashud's Portfolio Dashboard
      </h1>
      <CenterContainer className="w-[100vw]">
        <div className="relative space-y-8 sm:mx-auto mx-6 sm:w-10/12 md:w-10/12 lg:w-[800px] rounded-lg border bg-white p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
          <PForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                  Login
                </h1>
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                <PInput name="email" label="Email" type="email" />
                <PInput name="password" label="Password" type="password" />
              </div>
              {/* Error Message & Forget Password */}

              <div className="text-xs relative">
                {error ? (
                  <p className="text-red-600 font-medium ml-1 absolute -bottom-1 left-1">
                    {(error as TError)?.data?.message}
                  </p>
                ) : (
                  <p className="opacity-0 select-none absolute -bottom-1 left-1">
                    No error
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-6">
                <FilledButton isLoading={isLoading}>Login</FilledButton>
              </div>
            </div>
          </PForm>
        </div>
      </CenterContainer>
    </div>
  );
};

export default LoginPage;
