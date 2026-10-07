export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  profileImage?: string;
  skills?: string[];
  resume?: string;
  isActive?: boolean;
}

export interface GetUserResponse {
  message: string;
  user: User;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}
