import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath: string,
  resourceType: "image" | "raw",
) => {
  if (!localFilePath) return null;

  try {
    // console.log(localFilePath);

    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    // console.log("Uploaded to Cloudinary!", uploadResponse.secure_url);

    if (fs.existsSync(localFilePath)) {
      // console.log("Deleting local file:", localFilePath);
      fs.unlinkSync(localFilePath);
    }

    return uploadResponse;
  } catch (error) {
    // console.error("Cloudinary upload error:", error);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

// deletes files from cloudinary after update
const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "raw",
) => {
  if (!publicId) return null;
  try {
    const deleteResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    // console.log("Deleted from Cloudinary:", deleteResponse);

    return deleteResponse;
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
