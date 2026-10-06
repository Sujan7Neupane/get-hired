export interface Job {
  _id: string;
  title: string;
  description: string;
  company: {
    _id: string;
    name: string;
    logo: string;
  };
  employer: string;
  location: {
    city: string;
    postalCodes: string[];
    country: string;
  };
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  skills: string[];
  experienceLevel: "entry" | "junior" | "mid" | "senior";
  status: "open" | "closed";
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetJobsResponse {
  message: string;
  jobs: Job[];
}

export interface GetJobByIdResponse {
  message: string;
  job: Job;
}

export interface CreateJobData {
  title: string;
  description: string;

  location: {
    city: string;
    province?: string;
    country: string;
    postalCode?: number;
  };

  employmentType: "full-time" | "part-time" | "contract" | "internship";

  salary: {
    min?: number;
    max?: number;
    currency: string;
  };

  skills: string[];

  experienceLevel: "entry" | "junior" | "mid" | "senior";

  expiresAt: string;
}

export interface CreateJobRequest {
  companyId: string;
  job: CreateJobData;
}
