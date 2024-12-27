import { FieldValues } from "react-hook-form";
import {
  TExperience,
  TReduxReponse,
  TReduxReponseWithoutMeta,
} from "../../types";
import { baseApi } from "../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExperienceAPI: builder.mutation({
      query: (payload: FieldValues) => {
        return {
          url: "/experience",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["experiencies"],
      transformResponse: (res: TReduxReponseWithoutMeta<TExperience>) => res,
    }),
    getAllExperiencesAPI: builder.query({
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }
        return {
          url: "/experience",
          method: "GET",
          params,
        };
      },
      providesTags: ["experiencies"],
      transformResponse: (res: TReduxReponse<TExperience[]>) => res?.data,
    }),
    updateExperienceAPI: builder.mutation({
      query: (payload: { id: string; data: FieldValues }) => {
        return {
          url: `/experience/${payload?.id}`,
          method: "PATCH",
          body: payload?.data,
        };
      },
      invalidatesTags: ["experiencies"],
      transformResponse: (res: TReduxReponseWithoutMeta<TExperience>) => res,
    }),
    deleteExperienceAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/experience/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["experiencies"],
      transformResponse: (res: TReduxReponseWithoutMeta<TExperience>) => res,
    }),
    retreivedExperienceAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/experience/retreived/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["experiencies"],
      transformResponse: (res: TReduxReponseWithoutMeta<TExperience>) => res,
    }),
  }),
});

export const {
  useCreateExperienceAPIMutation,
  useGetAllExperiencesAPIQuery,
  useUpdateExperienceAPIMutation,
  useDeleteExperienceAPIMutation,
  useRetreivedExperienceAPIMutation,
} = experienceApi;
