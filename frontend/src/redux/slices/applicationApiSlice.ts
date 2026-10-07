import { APPLICATION_URL } from "../../../constants";
import apiSlice from "../apiSlice";

import type {
  ApplicationResponse,
  ApplicationStatus,
  ApplyJobResponse,
  GetMyApplicationsResponse,
  UpdateApplicationStatusResponse,
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

    getJobApplications: builder.query<GetMyApplicationsResponse, string>({
      query: (jobId) => ({
        url: `${APPLICATION_URL}/${jobId}/applications`,
      }),
      providesTags: ["Application"],
    }),

    updateApplicationStatus: builder.mutation<
      UpdateApplicationStatusResponse,
      {
        applicationId: string;
        status: ApplicationStatus;
      }
    >({
      query: ({ applicationId, status }) => ({
        url: `${APPLICATION_URL}/${applicationId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Application"],
    }),
    getEmployerApplications: builder.query<GetMyApplicationsResponse, void>({
      query: () => ({
        url: `${APPLICATION_URL}/employer`,
      }),
      providesTags: ["Application"],
    }),
    getApplication: builder.query<ApplicationResponse, string>({
      query: (applicationId) => ({
        url: `${APPLICATION_URL}/${applicationId}`,
      }),
      providesTags: ["Application"],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useGetEmployerApplicationsQuery,
  useGetApplicationQuery,
} = applicationApiSlice;
