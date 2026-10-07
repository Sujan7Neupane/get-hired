import express from "express";
import {
  applyJob,
  getApplication,
  getEmployerApplications,
  getJobApplications,
  getMyApplication,
  updateApplicationStatus,
  withdrawApplication,
} from "../controllers/application.controllers.ts";
import { checkAuth, checkCandidate, checkEmployer } from "../lib/checkAuth.ts";
import upload from "../middleware/multer.middleware.ts";

const router = express.Router();

router.post(
  "/:jobId",
  checkAuth,
  checkCandidate,
  upload.single("resume"),
  applyJob,
);

router.get("/my-applications", checkAuth, checkCandidate, getMyApplication);

// employer
router.patch(
  "/:applicationId/status",
  checkAuth,
  checkEmployer,
  updateApplicationStatus,
);
router.get("/employer", checkAuth, checkEmployer, getEmployerApplications);

// employer
router.get(
  "/:jobId/applications",
  checkAuth,
  checkEmployer,
  getJobApplications,
);

router.patch(
  "/:applicationId/withdraw",
  checkAuth,
  checkCandidate,
  withdrawApplication,
);

// employer own jobs + candidate own job
router.get("/:applicationId", checkAuth, getApplication);
// NOTE: In above api
// Candidate
// → Can view the application
// → ONLY if they submitted it

// Employer
// → Can view the application
// → ONLY if the application is for their job

export default router;
