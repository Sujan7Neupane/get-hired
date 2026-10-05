import { DASHBOARD_URL } from "../../../constants";
import type {
  CandidateDashboardResponse,
  EmployerDashboardResponse,
} from "../../types/dashboard";

import apiSlice from "../apiSlice";

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query<CandidateDashboardResponse, void>({
      query: () => ({
        url: `${DASHBOARD_URL}/candidate`,
      }),
    }),
    getEmployerDashboard: builder.query<EmployerDashboardResponse, void>({
      query: () => `${DASHBOARD_URL}/employer`,
    }),
  }),
});

export const { useGetCandidateDashboardQuery, useGetEmployerDashboardQuery } =
  dashboardApiSlice;
