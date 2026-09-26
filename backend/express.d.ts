declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        fullName: string;
        email: string;
        role: "candidate" | "employer" | "admin";
        profileImage?: string | undefined;
      };
    }
  }
}

export {};
