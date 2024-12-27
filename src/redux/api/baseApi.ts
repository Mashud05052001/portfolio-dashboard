import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./apiBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: ["skills", "projects", "experiencies", "educations", "blogs"],
  endpoints: () => ({}),
});
