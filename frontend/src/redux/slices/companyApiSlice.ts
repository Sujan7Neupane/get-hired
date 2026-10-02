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
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = companyApiSlice;
