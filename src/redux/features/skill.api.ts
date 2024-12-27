import { FieldValues } from "react-hook-form";
import {
  TReduxReponse,
  TReduxReponseWithoutMeta,
  TSkillData,
} from "../../types";
import { baseApi } from "../api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSkillAPI: builder.mutation({
      query: (payload: FormData) => {
        return {
          url: "/skill",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["skills"],
      transformResponse: (res: TReduxReponseWithoutMeta<TSkillData>) => res,
    }),
    getAllSkillsAPI: builder.query({
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }
        return {
          url: "/skill",
          method: "GET",
          params,
        };
      },
      providesTags: ["skills"],
      transformResponse: (res: TReduxReponse<TSkillData[]>) => res?.data,
    }),
    updateSkillAPI: builder.mutation({
      query: (payload: { id: string; data: FieldValues | FormData }) => {
        return {
          url: `/skill/${payload?.id}`,
          method: "PATCH",
          body: payload?.data,
        };
      },
      invalidatesTags: ["skills"],
      transformResponse: (res: TReduxReponseWithoutMeta<TSkillData>) => res,
    }),
    deleteSkillAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/skill/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["skills"],
      transformResponse: (res: TReduxReponseWithoutMeta<TSkillData>) => res,
    }),
    retreivedSkillAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/skill/retreived/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["skills"],
      transformResponse: (res: TReduxReponseWithoutMeta<TSkillData>) => res,
    }),
  }),
});

export const {
  useCreateSkillAPIMutation,
  useGetAllSkillsAPIQuery,
  useUpdateSkillAPIMutation,
  useDeleteSkillAPIMutation,
  useRetreivedSkillAPIMutation,
} = skillApi;
