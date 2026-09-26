import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import { connectDB } from "./db/dbConnect.ts";

import userRouter from "../backend/routes/user.routes.ts";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);

connectDB().then(() =>
  app.listen(PORT, () =>
    console.log(`Server is up and running in port:${PORT}`),
  ),
);

app.get("/", (_, res) =>
  res.json({
    message: "Welcome to GetHired - job seeking platform.",
  }),
);
