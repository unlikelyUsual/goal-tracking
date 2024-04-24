import mongoose, { Document, model, Schema } from "mongoose";
import { FREQUENCY } from "../utils/enums";
import type { IReminder } from "./reminder.model";

export interface ITask extends Document {
  _id: string;
  goalId: mongoose.Types.ObjectId;
  title: string;
  quantity: number;
  frequency: FREQUENCY;
  customDays?: number;
  reminders: IReminder[];
}

const taskSchema = new Schema<ITask>({
  goalId: { type: Schema.Types.ObjectId, ref: "goals", required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  frequency: { type: String, enum: Object.values(FREQUENCY), required: true },
  customDays: { type: Number },
  reminders: [{ type: Schema.Types.ObjectId, ref: "reminders" }],
});

export default model<ITask>("tasks", taskSchema);
