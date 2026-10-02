import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getSpecificCompanyJobs,
  updateJob,
} from "../controllers/jobs.controllers.ts";
import { checkAuth, checkEmployer } from "../lib/checkAuth.ts";

const router = express.Router();

router.post("/:companyId", checkAuth, checkEmployer, createJob);
router.get("/", getAllJobs);
router.get("/:companyId/jobs", getSpecificCompanyJobs);
router.get("/:jobId", getJobById);
router.patch("/:jobId", checkAuth, checkEmployer, updateJob);
router.delete("/:jobId", checkAuth, checkEmployer, deleteJob);

export default router;
