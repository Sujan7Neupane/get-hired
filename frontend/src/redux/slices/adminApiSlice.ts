import { ADMIN_URL } from "../../../constants";
import type { GetAdminApplicationsResponse } from "../../types/application";
import type {
  AdminCompaniesResponse,
  GetUserResponse,
  UsersResponse,
} from "../../types/auth";
import type { GetCompanyByIdResponse } from "../../types/company";
import apiSlice from "../apiSlice";

const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => `${ADMIN_URL}/users`,
      providesTags: ["User"],
    }),

    changeUserStatus: builder.mutation<GetUserResponse, string>({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/${userId}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    getCompanies: builder.query<AdminCompaniesResponse, void>({
      query: () => `${ADMIN_URL}/companies`,
    }),
    getApplications: builder.query<GetAdminApplicationsResponse, void>({
      query: () => `${ADMIN_URL}/applications`,
    }),
    getCompanyById: builder.query<GetCompanyByIdResponse, string>({
      query: (companyId) => `${ADMIN_URL}/companies/${companyId}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useChangeUserStatusMutation,
  useGetCompaniesQuery,
  useGetApplicationsQuery,
} = adminApiSlice;
