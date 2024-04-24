import mongoose from "mongoose";
import Logger from "../utils/Logger";

const logger = new Logger("Database");

export const connectDb = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      logger.log("successfully connected to the database");
    })
    .catch((err) => {
      logger.error("error connecting to the database", err);
      process.exit();
    });
};

export default connectDb;
