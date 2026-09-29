import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

// candidate cant save same job twice
SavedJobSchema.index({ candidate: 1, job: 1 }, { unique: true });

export const SavedJob = mongoose.model("SavedJob", SavedJobSchema);
