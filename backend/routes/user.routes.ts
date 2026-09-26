import express from "express";
import {
  getUserInfo,
  logout,
  registerUser,
  userLogin,
} from "../controllers/auth.controllers.ts";
import { checkAuth } from "../lib/checkAuth.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logout);
router.get("/user-info", checkAuth, getUserInfo);

export default router;
