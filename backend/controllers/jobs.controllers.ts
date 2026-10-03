import type { Request, Response } from "express";
import { Company } from "../models/company.models.ts";
import { Job } from "../models/job.models.ts";

const createJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      title,
      description,
      location,
      employmentType,
      salary,
      skills,
      experienceLevel,
      expiresAt,
    } = req.body;

    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found!" });
    }

    if (String(company.employer) !== req.user._id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const job = await Job.create({
      title,
      description,
      company: company._id,
      employer: req.user._id,
      location,
      employmentType,
      salary,
      experienceLevel,
      skills,
      expiresAt,
    });

    res.status(201).json({ message: "New job added.", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating a new job." });
  }
};

const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { status, skills, employmentType, keyword, location } = req.query;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    if (typeof skills === "string") {
      filter.skills = {
        $all: skills.split(","),
      };
    }

    if (typeof keyword === "string" && keyword.trim()) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ];
    }

    if (typeof location === "string" && location.trim()) {
      filter["location.city"] = {
        $regex: location,
        $options: "i",
      };
    }

    const jobs = await Job.find(filter).populate("company", "name logo");
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
      });
    }

    res.json({ message: "Fetched all jobs", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job bot found" });

    res.json({ message: "Job fetched", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job" });
  }
};

const getSpecificCompanyJobs = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found!" });
    }

    const jobs = await Job.find({ company: company._id });
    if (!jobs) {
      return res.status(404).json({ message: "Jobs not found!" });
    }
    res.json({ message: "Jobs fetched.", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job." });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const {
      title,
      description,
      location,
      employmentType,
      salary,
      skills,
      skillToAdd,
      skillToRemove,
      experienceLevel,
      status,
      expiresAt,
    } = req.body;

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    if (String(job.employer) !== req.user._id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.employmentType = employmentType || job.employmentType;
    job.salary = salary || job.salary;
    job.skills = skills || job.skills;
    job.experienceLevel = experienceLevel || job.experienceLevel;
    job.status = status || job.status;
    job.expiresAt = expiresAt || job.expiresAt;

    if (skillToAdd && !job.skills.includes(skillToAdd)) {
      job.skills.push(skillToAdd);
    }

    if (skillToRemove) {
      job.skills = job.skills.filter((skill) => skill !== skillToRemove);
    }

    await job.save();

    res.status(200).json({
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating job.",
    });
  }
};

const deleteJob = async function (req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    if (String(job.employer) !== req.user._id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting job.",
    });
  }
};

export {
  createJob,
  getAllJobs,
  getJobById,
  getSpecificCompanyJobs,
  updateJob,
  deleteJob,
};
