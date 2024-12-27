/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import httpStatus from "http-status";
import { logout } from "../features/auth/auth.slice";
import { RootState } from "../store";

export const baseURL = `${import.meta.env.VITE_BACKEND_API}`;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders(headers, api) {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const { dispatch } = api;
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === httpStatus.UNAUTHORIZED) {
    dispatch(logout());
  }

  return result;
};
