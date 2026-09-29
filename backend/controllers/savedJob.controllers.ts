import type { Request, Response } from "express";
import { Job } from "../models/job.models.ts";
import { SavedJob } from "../models/savedJob.models.ts";

const saveJob = async (req: Request, res: Response) => {
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
        message: "Job not found!",
      });
    }

    const existingSavedJob = await SavedJob.findOne({
      candidate: req.user._id,
      job: job._id,
    });
    if (existingSavedJob) {
      return res.status(400).json({
        message: "Job is already saved.",
      });
    }

    const savedJob = await SavedJob.create({
      candidate: req.user._id,
      job: job._id,
    });

    return res.status(201).json({
      message: "Job saved successfully.",
      savedJob,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error saving job.",
    });
  }
};

const getAllSavedJobs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const savedJobs = await SavedJob.find({
      candidate: req.user._id,
    }).populate("job");

    if (savedJobs.length === 0) {
      return res.status(404).json({
        message: "You don't have any saved jobs.",
      });
    }

    return res.status(200).json({
      message: "Saved jobs fetched successfully.",
      savedJobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching saved jobs.",
    });
  }
};

const getSavedJobById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { jobId } = req.params;
    // console.log(jobId);

    const savedJob = await SavedJob.findOne({
      candidate: req.user._id,
      job: jobId,
    }).populate("job");

    // console.log(saveJob);

    if (!savedJob) {
      return res.status(404).json({
        message: "You don't have any saved Jobs.",
      });
    }

    return res.status(200).json({
      message: "Saved job found.",
      savedJob,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error checking saved job.",
    });
  }
};

const deleteSavedJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const { jobId } = req.params;

    const savedJob = await SavedJob.findOneAndDelete({
      candidate: req.user._id,
      job: jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        message: "Saved job not found.",
      });
    }

    return res.status(200).json({
      message: "Job removed from saved jobs.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error removing saved job.",
    });
  }
};

export { saveJob, getAllSavedJobs, getSavedJobById, deleteSavedJob };
