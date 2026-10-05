import type { Application } from "./application";
import type { SavedJob } from "./savedJobs";

export interface CandidateDashboard {
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
  hiredApplications: number;
  savedJobs: number;
  recentApplications: Application[];
  recentSavedJobs: SavedJob[];
}

export interface CandidateDashboardResponse {
  message: string;
  dashboard: CandidateDashboard;
}

export interface EmployerDashboard {
  totalCompanies: number;
  totalJobs: number;
  openJobs: number;
  totalApplications: number;
  pendingApplications: number;
  shortListedApplications: number;
  hiredApplications: number;
  recentApplications: Application[];
}

export interface EmployerDashboardResponse {
  message: string;
  dashboard: EmployerDashboard;
}
