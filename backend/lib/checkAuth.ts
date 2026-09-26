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

export { checkAuth };
