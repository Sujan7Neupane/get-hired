import { COMPANY_URL } from "../../../constants";
import type {
  GetCompaniesResponse,
  GetCompanyByIdResponse,
} from "../../types/company";
import apiSlice from "../apiSlice";

const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => ({
        url: COMPANY_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getCompanyById: builder.query<GetCompanyByIdResponse, string>({
      query: (id) => ({
        url: `${COMPANY_URL}/${id}`,
      }),
      providesTags: ["Company"],
    }),

    getEmployerCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => ({
        url: `${COMPANY_URL}/employer`,
      }),
      providesTags: ["Company"],
    }),

    createCompany: builder.mutation<GetCompanyByIdResponse, FormData>({
      query: (formData) => ({
        url: `${COMPANY_URL}/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Company"],
    }),

    updateCompany: builder.mutation<
      GetCompanyByIdResponse,
      { companyId: string; formData: FormData }
    >({
      query: ({ companyId, formData }) => ({
        url: `${COMPANY_URL}/${companyId}/update`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation<{ message: string }, string>({
      query: (companyId) => ({
        url: `${COMPANY_URL}/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApiSlice;
