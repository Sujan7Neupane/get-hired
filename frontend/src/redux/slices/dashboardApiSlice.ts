import { DASHBOARD_URL } from "../../../constants";
import type { Application } from "../../types/application";
import type { SavedJob } from "../../types/savedJobs";

import apiSlice from "../apiSlice";

interface CandidateDashboard {
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
  hiredApplications: number;
  savedJobs: number;
  recentApplications: Application[];
  recentSavedJobs: SavedJob[];
}

interface CandidateDashboardResponse {
  message: string;
  dashboard: CandidateDashboard;
}

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query<CandidateDashboardResponse, void>({
      query: () => ({
        url: `${DASHBOARD_URL}/candidate`,
      }),
    }),
  }),
});

export const { useGetCandidateDashboardQuery } = dashboardApiSlice;
