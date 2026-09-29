import type { Request, Response } from "express";
import { User } from "../models/user.models.ts";
import { Company } from "../models/company.models.ts";
import { Job } from "../models/job.models.ts";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found.",
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully.",
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching users.",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully.",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching user.",
    });
  }
};

const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: "User status changed successfully", user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error changing user status.",
    });
  }
};

const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully.",
      companies,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching companies.",
    });
  }
};

const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      message: "Company fetched successfully.",
      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching company.",
    });
  }
};

const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
      });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching jobs.",
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully.",
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching job.",
    });
  }
};

export {
  getUsers,
  getUserById,
  changeUserStatus,
  getCompanies,
  getCompanyById,
  getJobs,
  getJobById,
};
