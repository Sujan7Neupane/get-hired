import express from "express";
import {
  deleteSavedJob,
  getAllSavedJobs,
  getSavedJobById,
  saveJob,
} from "../controllers/savedJob.controllers.ts";
import { checkAuth, checkCandidate } from "../lib/checkAuth.ts";

const router = express.Router();

router.post("/:jobId", checkAuth, checkCandidate, saveJob);
router.get("/", checkAuth, checkCandidate, getAllSavedJobs);
router.get("/:jobId", checkAuth, checkCandidate, getSavedJobById);
router.delete("/:jobId", checkAuth, checkCandidate, deleteSavedJob);

export default router;
