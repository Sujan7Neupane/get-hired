import express from "express";
import { checkAdmin, checkAuth } from "../lib/checkAuth.ts";
import {
  changeUserStatus,
  getCompanies,
  getCompanyById,
  getJobById,
  getJobs,
  getUserById,
  getUsers,
} from "../controllers/admin.controllers.ts";

const router = express.Router();

router.get("/users", checkAuth, checkAdmin, getUsers);
router.get("/users/:userId", checkAuth, checkAdmin, getUserById);
router.patch("/users/:userId/status", checkAuth, checkAdmin, changeUserStatus);

router.get("/companies", checkAuth, checkAdmin, getCompanies);
router.get("/companies/:companyId", checkAuth, checkAdmin, getCompanyById);

router.get("/jobs", checkAuth, checkAdmin, getJobs);
router.get("/jobs/:jobId", checkAuth, checkAdmin, getJobById);

export default router;
