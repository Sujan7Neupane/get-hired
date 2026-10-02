import { JOB_URL } from "../../../constants";
import type { GetJobByIdResponse, GetJobsResponse } from "../../types/job";
import apiSlice from "../apiSlice";

const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<GetJobsResponse, void>({
      query: () => ({
        url: JOB_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getJobById: builder.query<GetJobByIdResponse, string>({
      query: (id) => ({
        url: `${JOB_URL}/${id}`,
      }),
    }),
    getSpecificCompanyJobs: builder.query<GetJobsResponse, string>({
      query: (companyId) => ({
        url: `${JOB_URL}/${companyId}/jobs`,
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetSpecificCompanyJobsQuery,
} = jobApiSlice;
