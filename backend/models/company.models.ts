import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: Number,
      trim: true,
    },
  },
  { _id: false },
);

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", CompanySchema);
