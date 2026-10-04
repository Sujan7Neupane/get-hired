import { APPLICATION_URL } from "../../../constants";
import apiSlice from "../apiSlice";

import type {
  ApplyJobResponse,
  GetMyApplicationsResponse,
} from "../../types/application";

const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation<
      ApplyJobResponse,
      { jobId: string; formData: FormData }
    >({
      query: ({ jobId, formData }) => ({
        url: `${APPLICATION_URL}/${jobId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),

    getMyApplications: builder.query<GetMyApplicationsResponse, void>({
      query: () => ({
        url: `${APPLICATION_URL}/my-applications`,
      }),
      providesTags: ["Application"],
    }),
  }),
});

export const { useApplyJobMutation, useGetMyApplicationsQuery } =
  applicationApiSlice;
