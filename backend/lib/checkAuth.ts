import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.ts";

type TokenPayload = {
  _id: string;
};

const jwt_secret = process.env.JWT_SECRET_KEY;
if (!jwt_secret) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const checkAuth = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwt: token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized! Please log in.",
      });
    }

    const { _id } = jwt.verify(token, jwt_secret) as TokenPayload;
    // console.log(_id);

    const user = await User.findById(_id);

    // console.log(user);

    req.user = {
      _id: user!._id.toString(),
      fullName: user!.fullName,
      email: user!.email,
      role: user!.role,
      profileImage: user!.profileImage,
    };

    next();

    // console.log(cookie);
  } catch (error) {
    console.log(error);
  }
};

const checkEmployer = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.user);

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  if (req.user.role !== "employer") {
    return res.status(403).json({
      message: "Only employers can access this route!",
    });
  }

  next();
};

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Only admin can access this route!",
    });
  }

  next();
};

export { checkAuth, checkEmployer, checkAdmin };
