import { BASE_URL } from "./../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Job", "Company", "User", "Application", "SavedJob"],
  endpoints: () => ({}),
});

export default apiSlice;
