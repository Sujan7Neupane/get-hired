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
