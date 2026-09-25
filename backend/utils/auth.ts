import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { Response } from "express";

type TokenProps = {
  _id: mongoose.Types.ObjectId;
  res: Response;
};

const jwt_secret = process.env.JWT_SECRET_KEY;
if (!jwt_secret) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const setToken = ({ _id, res }: TokenProps) => {
  try {
    const token = jwt.sign({ _id }, jwt_secret, { expiresIn: "10d" });

    // console.log(token);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
  } catch (error: any) {
    console.log("Error generating Token", error.message);
  }
};

export { setToken };
