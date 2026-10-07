import { USER_URL } from "../../../constants";
import type { UpdateProfileResponse } from "../../types/auth";
import apiSlice from "../apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
    updateEmployerProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: `${USER_URL}/employer/profile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateEmployerProfileMutation,
} = authApiSlice;
