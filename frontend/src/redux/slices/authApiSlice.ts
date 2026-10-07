import { AUTH_URL, USER_URL } from "../../../constants";
import type { GetUserResponse, User } from "../../types/auth";
import apiSlice from "../apiSlice";

interface LogoutResponse {
  message: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    userInfo: builder.query<GetUserResponse, void>({
      query: () => ({
        url: `${AUTH_URL}/user-info`,
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = authApiSlice;
