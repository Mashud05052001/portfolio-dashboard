import { FieldValues } from "react-hook-form";
import {
  TEducation,
  TReduxReponse,
  TReduxReponseWithoutMeta,
} from "../../types";
import { baseApi } from "../api/baseApi";

const EducationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEducationAPI: builder.mutation({
      query: (payload: FieldValues) => {
        return {
          url: "/education",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["educations"],
      transformResponse: (res: TReduxReponseWithoutMeta<TEducation>) => res,
    }),
    getAllEducationsAPI: builder.query({
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }
        return {
          url: "/education",
          method: "GET",
          params,
        };
      },
      providesTags: ["educations"],
      transformResponse: (res: TReduxReponse<TEducation[]>) => res?.data,
    }),
    updateEducationAPI: builder.mutation({
      query: (payload: { id: string; data: FieldValues }) => {
        return {
          url: `/education/${payload?.id}`,
          method: "PATCH",
          body: payload?.data,
        };
      },
      invalidatesTags: ["educations"],
      transformResponse: (res: TReduxReponseWithoutMeta<TEducation>) => res,
    }),
    deleteEducationAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/education/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["educations"],
      transformResponse: (res: TReduxReponseWithoutMeta<TEducation>) => res,
    }),
    retreivedEducationAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/education/retreived/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["educations"],
      transformResponse: (res: TReduxReponseWithoutMeta<TEducation>) => res,
    }),
  }),
});

export const {
  useCreateEducationAPIMutation,
  useGetAllEducationsAPIQuery,
  useUpdateEducationAPIMutation,
  useDeleteEducationAPIMutation,
  useRetreivedEducationAPIMutation,
} = EducationApi;
