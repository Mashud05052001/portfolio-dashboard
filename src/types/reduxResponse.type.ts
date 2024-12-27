/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TErrorSource = { path: string; message: string };

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack?: string;
    errorSources: TErrorSource[];
  };
};
export type TMeta = {
  totalData: number;
  limit: number;
  page: number;
  skip: number;
  totalPage: number;
};

export type TResponse = {
  success: boolean;
  message: string;
  data: any;
};

export type TResponseMetaData<T> = {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta: TMeta;
  };
};

export type TResponseData<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};

export type TReduxReponse<T> = TResponseMetaData<T> & BaseQueryApi;
export type TReduxReponseWithoutMeta<T> = TResponseData<T> & BaseQueryApi;
export type TSpecificReduxResponse<T> = BaseQueryApi & T;
