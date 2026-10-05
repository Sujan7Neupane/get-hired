import type { Job } from "./job";

export interface SavedJob {
  _id: string;
  candidate: string;
  job: Job;
  createdAt: string;
  updatedAt: string;
}

export interface SavedJobResponse {
  message: string;
  savedJob: SavedJob;
}

export interface GetSavedJobsResponse {
  message: string;
  savedJobs: SavedJob[];
}
