import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  getJobById,
  updateJob,
} from "../controllers/jobs.controllers.ts";
import { checkAuth, checkEmployer } from "../lib/checkAuth.ts";

const router = express.Router();

router.post("/:companyId", checkAuth, checkEmployer, createJob);
router.get("/", checkAuth, getAllJobs);
router.get("/:companyId/jobs", checkAuth, getJobById);
router.get("/:jobId", checkAuth, getJob);
router.patch("/:jobId", checkAuth, checkEmployer, updateJob);
router.delete("/:jobId", checkAuth, checkEmployer, deleteJob);

export default router;
