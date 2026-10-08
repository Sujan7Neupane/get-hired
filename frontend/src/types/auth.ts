import type { Company } from "./company";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  profileImage?: string;
  skills?: string[];
  resume?: string;
  isActive?: boolean;
  createdAt: Date;
}

export interface UsersResponse {
  message: string;
  users: User[];
}

export interface GetUserResponse {
  message: string;
  user: User;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export interface AdminCompaniesResponse {
  message: string;
  companies: Company[];
}

export interface AdminCompanyResponse {
  message: string;
  company: Company;
}
