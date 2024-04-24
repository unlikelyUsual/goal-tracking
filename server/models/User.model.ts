import { model, Schema } from "mongoose";

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  height: number;
  weight: number;
  bmi: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("users", userSchema);
