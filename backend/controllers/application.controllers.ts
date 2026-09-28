import type { Request, Response } from "express";
import { Job } from "../models/job.models.ts";
import { Application } from "../models/application.models.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";
import type mongoose from "mongoose";

type PopulatedCandidate = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  profileImage?: string;
};

type PopulatedJob = {
  _id: mongoose.Types.ObjectId;
  title: string;
  company: string;
  employer: mongoose.Types.ObjectId;
};

const applyJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const { coverLetter } = req.body;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "No job found." });

    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({
        message: "Resume is required.",
      });
    }
    const uploadResume = await uploadOnCloudinary(file.path, "raw");
    if (!uploadResume) {
      return res.status(500).json({
        message: "Error uploading resume.",
      });
    }

    const existingApplication = await Application.findOne({
      candidate: req.user._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: job._id,
      resume: uploadResume?.secure_url,
      coverLetter,
    });

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error applying Job" });
  }
};

const getMyApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const applications = await Application.find({
      candidate: req.user._id,
    });

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found.",
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error fetching job applications.",
    });
  }
};

const getApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { applicationId } = req.params;
    const application = await Application.findById(applicationId)
      .populate<{
        candidate: PopulatedCandidate;
      }>("candidate", "fullName email profileImage")
      .populate<{ job: PopulatedJob }>("job", "title company employer");

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    if (
      req.user.role === "candidate" &&
      String(application.candidate._id) !== req.user._id
    ) {
      return res.status(403).json({
        message: "You can only view your own application.",
      });
    }

    if (
      req.user.role === "employer" &&
      String(application.job.employer) !== req.user._id
    ) {
      return res.status(403).json({
        message: "You can only view applications for your own jobs.",
      });
    }

    return res.status(200).json({
      message: "Application fetched successfully.",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error fetching application.",
    });
  }
};

const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    if (String(job.employer) !== req.user._id) {
      return res.status(403).json({
        message: "You can only update applications for your own jobs.",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error updating application status.",
    });
  }
};

const withdrawApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    if (String(application.candidate) !== req.user._id) {
      return res.status(403).json({
        message: "You can only withdraw your own application.",
      });
    }

    if (application.status === "rejected" || application.status === "hired") {
      return res.status(400).json({
        message: "This application can no longer be withdrawn.",
      });
    }

    if (application.status === "withdrawn") {
      return res.status(400).json({
        message: "Application is already withdrawn.",
      });
    }

    application.status = "withdrawn";

    await application.save();

    return res.status(200).json({
      message: "Application withdrawn successfully.",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error withdrawing application.",
    });
  }
};

const getJobApplications = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    if (String(job.employer) !== req.user._id) {
      return res.status(403).json({
        message: "You can only view applications for your own jobs.",
      });
    }

    const applications = await Application.find({
      job: jobId,
    }).populate("candidate", "fullName email profileImage");

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found.",
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error fetching job applications.",
    });
  }
};

export {
  applyJob,
  getMyApplication,
  getApplication,
  updateApplicationStatus,
  withdrawApplication,
  getJobApplications,
};
