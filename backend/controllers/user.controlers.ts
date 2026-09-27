import type { Request, Response } from "express";
import { User } from "../models/user.models.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) res.json({ message: "User not found" });

    res.json({
      message: "User fetched successfully",
      user: {
        id: user?._id,
        fullName: user?.fullName,
        email: user?.email,
        role: user?.role,
        profileImage: user?.profileImage,
      },
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      error: "Error fetching user info.",
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { fullName, skills } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can upload resumes.",
      });
    }

    const user = await User.findById(req.user?._id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const files = req.files as { [field: string]: Express.Multer.File[] };
    const image = await uploadOnCloudinary(
      files?.profileImage?.[0]?.path,
      "image",
    );
    const resume = await uploadOnCloudinary(files?.resume?.[0]?.path, "raw");

    user.fullName = fullName || user.fullName;
    const skillsArray = skills.split(",").map((skill: String) => skill.trim()); //string array because we need to map it later
    if (skills) user.skills = skillsArray;
    if (image) user.profileImage = image.secure_url;
    if (resume) user.resume = resume.secure_url;

    // console.log(typeof skillsArray);

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        skills: user.skills,
        resume: user.resume,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      error: "Error updating user profile.",
    });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error updating user password.",
    });
  }
};

export { getUserById, updateProfile, updatePassword };
