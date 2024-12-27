import { FieldValues } from "react-hook-form";
import { TBlog, TReduxReponse, TReduxReponseWithoutMeta } from "../../types";
import { baseApi } from "../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlogAPI: builder.mutation({
      query: (payload: FormData) => {
        return {
          url: "/blog",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["blogs"],
      transformResponse: (res: TReduxReponseWithoutMeta<TBlog>) => res,
    }),
    getAllBlogsAPI: builder.query({
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }
        return {
          url: "/blog",
          method: "GET",
          params,
        };
      },
      providesTags: ["blogs"],
      transformResponse: (res: TReduxReponse<TBlog[]>) => res?.data,
    }),
    updateBlogAPI: builder.mutation({
      query: (payload: { id: string; data: FieldValues | FormData }) => {
        return {
          url: `/blog/${payload?.id}`,
          method: "PATCH",
          body: payload?.data,
        };
      },
      invalidatesTags: ["blogs"],
      transformResponse: (res: TReduxReponseWithoutMeta<TBlog>) => res,
    }),
    deleteBlogAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blogs"],
      transformResponse: (res: TReduxReponseWithoutMeta<TBlog>) => res,
    }),
    retreivedBlogAPI: builder.mutation({
      query: (id: string) => {
        return {
          url: `/blog/retreived/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["blogs"],
      transformResponse: (res: TReduxReponseWithoutMeta<TBlog>) => res,
    }),
  }),
});

export const {
  useCreateBlogAPIMutation,
  useGetAllBlogsAPIQuery,
  useUpdateBlogAPIMutation,
  useDeleteBlogAPIMutation,
  useRetreivedBlogAPIMutation,
} = blogApi;
