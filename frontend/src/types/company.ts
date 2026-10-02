export interface Location {
  city: string;
  province?: string;
  country: string;
  postalCode?: number;
}

export interface Company {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  location: Location;
  industry: string;
  employer: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCompaniesResponse {
  message: string;
  companies: Company[];
}

export interface GetCompanyByIdResponse {
  message: string;
  company: Company;
}
