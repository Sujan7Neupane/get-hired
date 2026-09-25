import mongoose from "mongoose";
import { DB_NAME } from "../constants.ts";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`,
    );

    console.log(`Connected to DB: ${connectionInstance.connection.host}`);
  } catch (error) {
    // console.log(error.message);
    throw new Error(`Error connecting to database`);
  }
};
