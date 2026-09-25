import type { Request, Response } from "express";
import { User } from "../models/user.models.ts";
import { setToken } from "../utils/auth.ts";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({
        error: "These fields are required!",
      });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        error: "User with this email already exists.",
      });

    const registeredUser = await User.create({
      fullName,
      email,
      password,
    });

    res.json({
      message: "User registered successfully!",
      user: {
        id: registeredUser._id,
        fullName: registeredUser.fullName,
        email: registeredUser.email,
        role: registeredUser.role,
        profileImage: registeredUser.profileImage,
      },
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      error: "Error registering user.",
    });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(email);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const existUser = await User.findOne({ email });
    // console.log(existUser);

    if (!existUser)
      return res.status(404).json({ error: "Invalid email or password." });

    if (!existUser.isActive) {
      return res.status(403).json({
        error: "Your account has been disabled.",
      });
    }

    const isPasswordMatch = await existUser.comparePassword(password);
    if (!isPasswordMatch)
      return res.status(401).json({
        error: "Invalid email or password.",
      });

    setToken({ _id: existUser._id, res });
    // console.log(token);

    res.json({
      message: "User loggedIn successfully!",
      user: {
        id: existUser._id,
        fullName: existUser.fullName,
        email: existUser.email,
        role: existUser.role,
        profileImage: existUser.profileImage,
      },
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      error: "Error logging in user.",
    });
  }
};

export { registerUser, userLogin };
