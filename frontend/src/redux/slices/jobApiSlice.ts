import { COMPANY_URL, JOB_URL } from "../../../constants";
import type { GetCompaniesResponse } from "../../types/company";
import type {
  CreateJobData,
  CreateJobRequest,
  GetJobByIdResponse,
  GetJobsResponse,
} from "../../types/job";
import apiSlice from "../apiSlice";

const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<
      GetJobsResponse,
      { keyword?: string; location?: string }
    >({
      query: (params) => ({
        url: JOB_URL,
        params,
      }),
      providesTags: ["Job"],
    }),
    getJobById: builder.query<GetJobByIdResponse, string>({
      query: (id) => ({
        url: `${JOB_URL}/${id}`,
      }),
      providesTags: ["Job"],
    }),
    getSpecificCompanyJobs: builder.query<GetJobsResponse, string>({
      query: (companyId) => ({
        url: `${JOB_URL}/${companyId}/jobs`,
      }),
      providesTags: ["Job"],
    }),
    getEmployerJobs: builder.query<GetJobsResponse, void>({
      query: () => ({
        url: `${JOB_URL}/employer`,
      }),
      providesTags: ["Job"],
    }),
    getEmployerJobById: builder.query<GetJobByIdResponse, string>({
      query: (id) => ({
        url: `${JOB_URL}/employer/${id}`,
      }),
      providesTags: ["Job"],
    }),
    getEmployerCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => ({
        url: `${COMPANY_URL}/employer`,
      }),
      providesTags: ["Company"],
    }),
    createJob: builder.mutation<GetJobByIdResponse, CreateJobRequest>({
      query: ({ companyId, job }) => ({
        url: `${JOB_URL}/${companyId}`,
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation<
      GetJobByIdResponse,
      {
        jobId: string;
        job: Partial<CreateJobData>;
      }
    >({
      query: ({ jobId, job }) => ({
        url: `${JOB_URL}/${jobId}`,
        method: "PATCH",
        body: job,
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJob: builder.mutation<{ message: string }, string>({
      query: (jobId) => ({
        url: `${JOB_URL}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetSpecificCompanyJobsQuery,
  useGetEmployerJobsQuery,
  useGetEmployerJobByIdQuery,
  useGetEmployerCompaniesQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApiSlice;
