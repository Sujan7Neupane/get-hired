import "dotenv/config";
import mongoose from "mongoose";

import { connectDB } from "./db/dbConnect.ts";
import { User } from "./models/user.models.ts";
import { Company } from "./models/company.models.ts";
import { Job } from "./models/job.models.ts";
import { Application } from "./models/application.models.ts";
import { SavedJob } from "./models/savedJob.models.ts";

const seed = async () => {
  try {
    await connectDB();

    const password = process.env.SEED_PASSWORD;
    if (!password) throw new Error("Set SEED_PASSWORD in .env");

    await Application.deleteMany({});
    await SavedJob.deleteMany({});
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({});

    // Users
    const [, employer1, employer2, candidate] = await User.create([
      {
        fullName: "GetHired Admin",
        email: "admin@example.com",
        password,
        role: "admin",
      },
      {
        fullName: "Sarah Johnson",
        email: "employer@example.com",
        password,
        role: "employer",
      },
      {
        fullName: "Michael Chen",
        email: "employer2@example.com",
        password,
        role: "employer",
      },
      {
        fullName: "Alex Morgan",
        email: "candidate@example.com",
        password,
        role: "candidate",
        skills: ["JavaScript", "React"],
        resume: "https://example.com/resumes/alex.pdf",
      },
    ]);

    // Companies
    const toronto = { city: "Toronto", province: "Ontario", country: "Canada" };
    const vancouver = {
      city: "Vancouver",
      province: "British Columbia",
      country: "Canada",
    };

    const [company1, company2] = await Company.create([
      {
        name: "TechNova Solutions",
        description: "A company building modern web applications.",
        industry: "Information Technology",
        location: toronto,
        employer: employer1._id,
      },
      {
        name: "NorthStar Analytics",
        description: "A company providing data analytics solutions.",
        industry: "Data Analytics",
        location: vancouver,
        employer: employer2._id,
      },
    ]);

    // Jobs
    const expiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

    const jobs = await Job.create([
      {
        title: "Junior Full-Stack Developer",
        description: "Build web applications using React and Node.js.",
        company: company1._id,
        employer: employer1._id,
        location: toronto,
        employmentType: "full-time",
        salary: { min: 60000, max: 80000, currency: "CAD" },
        skills: ["React", "Node.js"],
        experienceLevel: "junior",
        status: "open",
        expiresAt,
      },
      {
        title: "Backend Developer",
        description: "Develop REST APIs and maintain backend services.",
        company: company1._id,
        employer: employer1._id,
        location: toronto,
        employmentType: "full-time",
        salary: { min: 75000, max: 95000, currency: "CAD" },
        skills: ["Node.js", "Express", "MongoDB"],
        experienceLevel: "mid",
        status: "open",
        expiresAt,
      },
      {
        title: "Frontend Developer Intern",
        description: "Build responsive user interfaces with React.",
        company: company1._id,
        employer: employer1._id,
        location: toronto,
        employmentType: "internship",
        salary: { min: 22, max: 30, currency: "CAD" },
        skills: ["React", "JavaScript", "CSS"],
        experienceLevel: "entry",
        status: "open",
        expiresAt,
      },
      {
        title: "Data Analyst",
        description: "Analyze datasets and prepare business reports.",
        company: company2._id,
        employer: employer2._id,
        location: vancouver,
        employmentType: "full-time",
        salary: { min: 65000, max: 85000, currency: "CAD" },
        skills: ["SQL", "Python", "Excel"],
        experienceLevel: "junior",
        status: "open",
        expiresAt,
      },
      {
        title: "Software Engineering Intern",
        description: "Help develop and test software features.",
        company: company2._id,
        employer: employer2._id,
        location: vancouver,
        employmentType: "internship",
        salary: { min: 24, max: 32, currency: "CAD" },
        skills: ["JavaScript", "Git"],
        experienceLevel: "entry",
        status: "open",
        expiresAt,
      },
    ]);

    // Application
    await Application.create({
      candidate: candidate._id,
      job: jobs[0]._id,
      resume: candidate.resume!,
      status: "pending",
    });

    console.log("Seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
