interface ApplicationCompany {
  _id: string;
  name: string;
  logo?: string;
}

interface ApplicationJob {
  _id: string;
  title: string;
  company: ApplicationCompany;
  location: {
    city: string;
    province?: string;
    country: string;
  };
  employmentType: "full-time" | "part-time" | "contract" | "internship";
}

interface Application {
  _id: string;
  candidate: string;
  job: ApplicationJob;
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
