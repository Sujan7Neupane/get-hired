import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: "candidate" | "employer" | "admin";
  profileImage?: string;
  skills: string[];
  resume?: string;
  isActive: boolean;

  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["candidate", "employer", "admin"],
      default: "candidate",
    },
    profileImage: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
