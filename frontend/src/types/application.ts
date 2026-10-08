import type { Company } from "./company";

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired"
  | "withdrawn";

export interface Application {
  _id: string;
  candidate: {
    _id: string;
    fullName: string;
    profileImage?: string;
    email: string;
  };
  job: {
    _id: string;
    title: string;
    company: {
      name: string;
    };
    location: {
      city: string;
      country: string;
    };
    employmentType: string;
  };
  resume: string;
  coverLetter?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApplyJobResponse {
  message: string;
  application: Application;
}

export interface GetMyApplicationsResponse {
  message: string;
  applications: Application[];
}

export interface ApplicationResponse {
  message: string;
  application: Application;
}

export interface UpdateApplicationStatusResponse {
  message: string;
  application: Application;
}

export interface GetAdminApplicationsResponse {
  message: string;
  applications: Application[];
}

export interface GetCompanyByIdResponse {
  message: string;
  company: Company;
}
