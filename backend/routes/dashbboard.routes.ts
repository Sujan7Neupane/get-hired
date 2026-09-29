import express from "express";
import {
  getAdminDashboard,
  getCandidateDashboard,
  getEmployerDashboard,
} from "../controllers/dashboard.controllers.ts";
import {
  checkAdmin,
  checkAuth,
  checkCandidate,
  checkEmployer,
} from "../lib/checkAuth.ts";

const router = express.Router();
router.get("/candidate", checkAuth, checkCandidate, getCandidateDashboard);
router.get("/employer", checkAuth, checkEmployer, getEmployerDashboard);
router.get("/admin", checkAuth, checkAdmin, getAdminDashboard);

export default router;
