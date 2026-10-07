import express from "express";
import {
  getUserById,
  updateEmployerProfile,
  updatePassword,
  updateProfile,
} from "../controllers/user.controlers.ts";
import { checkAuth, checkEmployer } from "../lib/checkAuth.ts";
import upload from "../middleware/multer.middleware.ts";

const router = express.Router();

router.post("/:userId", checkAuth, getUserById);

router.patch(
  "/profile",
  checkAuth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile,
);

router.patch(
  "/employer/profile",
  checkAuth,
  checkEmployer,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateEmployerProfile,
);

router.patch("/update-password", checkAuth, updatePassword);

export default router;
