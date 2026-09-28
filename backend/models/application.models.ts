import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "shortlisted",
        "rejected",
        "hired",
        "withdrawn",
      ],
      default: "pending",
    },
  },
  { timestamps: true },
);

// one candidate one application
ApplicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

export const Application = mongoose.model("Application", ApplicationSchema);
