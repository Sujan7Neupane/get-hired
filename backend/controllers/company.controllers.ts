import type { Request, Response } from "express";
import { Company } from "../models/company.models.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";

const createCompany = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const { name, description, website, location, industry } = req.body;
    if (!name || !description || !website || !location || !industry)
      return res.status(400).json({
        error: "All fields are required!",
      });

    const existCompany = await Company.findOne({ name });
    if (existCompany)
      return res.status(404).json({ message: "Company already exists." });

    const file = req.file as Express.Multer.File;
    const logoUpload = await uploadOnCloudinary(file.path, "image");

    const parsedLocation = JSON.parse(location);

    const company = await Company.create({
      name,
      description,
      logo: logoUpload?.secure_url,
      website,
      location: parsedLocation,
      industry,
      employer: req.user._id,
    });

    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      error: "Error creating company.",
    });
  }
};

const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    res.json({
      message: "All companies fetched.",
      companies,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching companies.",
    });
  }
};

const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    res.json({ message: "Company fetched successfully!", company });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching company.",
    });
  }
};

const updateCompany = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const { name, description, website, location, industry } = req.body;
    // console.log(req.body);
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }
    // console.log(company);

    if (company.employer.toString() !== req.user._id) {
      return res.status(403).json({
        message: "You can only modify your own company.",
      });
    }

    const file = req.file;
    const logo = file ? await uploadOnCloudinary(file.path, "image") : null;

    company.name = name || company.name;
    company.description = description || company.description;
    if (logo) company.logo = logo?.secure_url || company.logo;
    if (location) company.location = JSON.parse(location);
    company.website = website || company.website;
    company.industry = industry || company.industry;

    await company.save();

    res.json({ message: "Company info updated successfully!", company });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
      error: "Error updating company infomrations.",
    });
  }
};

const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    if (String(company.employer) !== req.user._id) {
      return res.status(403).json({
        message: "You can only delete your own company.",
      });
    }

    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error deleting company.",
    });
  }
};

export {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
