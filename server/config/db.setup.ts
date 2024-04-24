import mongoose from "mongoose";
import Logger from "../utils/Logger";

const logger = new Logger("Database");
/***
 * Connect to db
 * Note : if running on local with mongo images replace @mongo:27017 with @localhost:27017
 */
export const connectDb = async () => {
  return await mongoose
    .connect(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
      logger.log("successfully connected to the database");
    })
    .catch((err) => {
      logger.error("error connecting to the database", err);
      process.exit();
    });
};

export default connectDb;
