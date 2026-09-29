import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import { connectDB } from "./db/dbConnect.ts";

import authRouter from "./routes/auth.routes.ts";
import userRouter from "./routes/user.routes.ts";
import companyRouter from "./routes/company.routes.ts";
import jobRouter from "./routes/jobs.routes.ts";
import applicationRouter from "./routes/application.routes.ts";
import savedJobsRouter from "./routes/saveJobs.routes.ts";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/saved-jobs", savedJobsRouter);

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
