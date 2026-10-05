import { SAVED_JOBS_URL } from "../../../constants";
import type {
  GetSavedJobsResponse,
  SavedJobResponse,
} from "../../types/savedJobs";
import apiSlice from "../apiSlice";

const savedJobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveJob: builder.mutation<SavedJobResponse, string>({
      query: (jobId) => ({
        url: `${SAVED_JOBS_URL}/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: ["SavedJob"],
    }),

    getSavedJobs: builder.query<GetSavedJobsResponse, void>({
      query: () => ({
        url: SAVED_JOBS_URL,
      }),
      providesTags: ["SavedJob"],
    }),

    getSavedJobById: builder.query<SavedJobResponse, string>({
      query: (jobId) => ({
        url: `${SAVED_JOBS_URL}/${jobId}`,
      }),
      providesTags: ["SavedJob"],
    }),

    deleteSavedJob: builder.mutation<{ message: string }, string>({
      query: (jobId) => ({
        url: `${SAVED_JOBS_URL}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJob"],
    }),
  }),
});

export const {
  useSaveJobMutation,
  useGetSavedJobsQuery,
  useGetSavedJobByIdQuery,
  useDeleteSavedJobMutation,
} = savedJobApiSlice;
