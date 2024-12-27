import { FieldValues } from "react-hook-form";
import { TProject, TReduxReponse, TReduxReponseWithoutMeta } from "../../types";
import { baseApi } from "../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProjectAPI: builder.mutation({
      query: (payload: FormData) => {
        return {
          url: "/project",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["projects"],
      transformResponse: (res: TReduxReponseWithoutMeta<TProject>) => res,
    }),
    getAllProjectsAPI: builder.query({
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }

        return {
          url: "/project",
          method: "GET",
          params,
        };
      },
      providesTags: ["projects"],
      transformResponse: (res: TReduxReponse<TProject[]>) => res?.data,
    }),
    updateProjectAPI: builder.mutation({
      query: (payload: { id: string; data: FieldValues | FormData }) => {
        return {
          url: `/project/${payload?.id}`,
          method: "PATCH",
          body: payload?.data,
        };
      },
      invalidatesTags: ["projects"],
      transformResponse: (res: TReduxReponseWithoutMeta<TProject>) => res,
    }),

    deleteProjectAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/project/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["projects"],
      transformResponse: (res: TReduxReponseWithoutMeta<TProject>) => res,
    }),

    retreivedProjectAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/project/retreived/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["projects"],
      transformResponse: (res: TReduxReponseWithoutMeta<TProject>) => res,
    }),
  }),
});

export const {
  useCreateProjectAPIMutation,
  useGetAllProjectsAPIQuery,
  useUpdateProjectAPIMutation,
  useDeleteProjectAPIMutation,
  useRetreivedProjectAPIMutation,
} = projectApi;
