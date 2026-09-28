import mongoose from "mongoose";
import { LocationSchema } from "./company.models.ts";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
    employmentType: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      currency: {
        type: String,
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "junior", "mid", "senior"],
      default: "entry",
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", JobSchema);
