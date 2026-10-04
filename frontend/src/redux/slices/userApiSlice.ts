import { USER_URL } from "../../../constants";
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
  }),
});

export const { useGetUserByIdQuery, useUpdateProfileMutation } = authApiSlice;
