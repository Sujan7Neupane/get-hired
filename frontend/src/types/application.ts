export interface Application {
  _id: string;
  candidate: string;
  job: string;
  resume: string;
  coverLetter?: string;
  status:
    | "pending"
    | "reviewing"
    | "shortlisted"
    | "rejected"
    | "hired"
    | "withdrawn";
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
