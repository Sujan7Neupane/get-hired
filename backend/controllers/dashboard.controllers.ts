import type { Request, Response } from "express";
import { Application } from "../models/application.models.ts";
import { SavedJob } from "../models/savedJob.models.ts";
import { Company } from "../models/company.models.ts";
import { Job } from "../models/job.models.ts";
import { User } from "../models/user.models.ts";

const getCandidateDashboard = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const applications = await Application.find({ candidate: req.user._id });
    // console.log(applications);

    const pendingApplications = applications.filter(
      (application) => application.status === "pending",
    ).length;

    const shortlistedApplications = applications.filter(
      (application) => application.status === "shortlisted",
    ).length;

    const hiredApplications = applications.filter(
      (application) => application.status === "hired",
    ).length;

    const savedJobs = await SavedJob.find({
      candidate: req.user._id,
    });
    // console.log(savedJobs);

    const recentApplications = await Application.find({
      candidate: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentSavedJobs = await SavedJob.find({
      candidate: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("job");

    res.json({
      message: "Candidate dashboard fetched successfully.",
      dashboard: {
        totalApplications: applications.length,
        pendingApplications,
        shortlistedApplications,
        hiredApplications,
        savedJobs: savedJobs.length,
        recentApplications,
        recentSavedJobs,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching candidate dashboard.",
    });
  }
};

const getEmployerDashboard = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const companies = await Company.find({
      employer: req.user._id,
    });

    const jobs = await Job.find({
      employer: req.user._id,
    });
    const openJobs = jobs.filter((job) => job.status === "open");

    // Applications have no employer field.
    // it belong to job, and the job belongs to employer.
    const applications = await Application.find({
      job: { $in: jobs.map((job) => job._id) },
    });

    const pendingApplications = applications.filter(
      (application) => application.status === "pending",
    );
    const shortListedApplications = applications.filter(
      (application) => application.status === "shortlisted",
    );
    const hiredApplications = applications.filter(
      (application) => application.status === "hired",
    );

    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      message: "Employer dashboard fetched successfully.",
      dashboard: {
        totalCompanies: companies.length,
        totalJobs: jobs.length,
        openJobs: openJobs.length,
        totalApplications: applications.length,
        pendingApplications: pendingApplications.length,
        shortListedApplications: shortListedApplications.length,
        hiredApplications: hiredApplications.length,
        recentApplications,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching employer dashboard.",
    });
  }
};

const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const users = await User.find();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    const totalCandidates = users.filter((user) => user.role === "candidate");
    const totalEmployers = users.filter((user) => user.role === "employer");

    const companies = await Company.find();

    const jobs = await Job.find();
    const openJobs = jobs.filter((job) => job.status === "open");

    const applications = await Application.find();

    res.json({
      message: "Admin dashboard fetched successfully.",
      dashboard: {
        totalUsers: users.length,
        totalCandidates: totalCandidates.length,
        totalEmployers: totalEmployers.length,
        totalCompanies: companies.length,
        totalJobs: jobs.length,
        openJobs: openJobs.length,
        totalApplications: applications.length,
        recentUsers,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching admin dashboard.",
    });
  }
};

export { getCandidateDashboard, getEmployerDashboard, getAdminDashboard };
