import express from "express";
import { checkAdmin, checkAuth, checkEmployer } from "../lib/checkAuth.ts";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controllers.ts";
import upload from "../middleware/multer.middleware.ts";

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  checkEmployer,
  upload.single("logo"),
  createCompany,
);

router.get("/", getCompanies);
router.get("/:companyId", getCompanyById);

router.patch(
  "/:companyId/update",
  checkAuth,
  checkEmployer,
  upload.single("logo"),
  updateCompany,
);

router.delete("/:companyId", checkAuth, checkEmployer, deleteCompany);

export default router;
