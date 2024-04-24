import mongoose, { Document, model, Schema } from "mongoose";

export interface IGoal extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  minTimeline: Date;
  maxTimeline: Date;
  startDate: Date;
  tasks: string[];
}

const goalSchema = new Schema<IGoal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    minTimeline: { type: Date, required: true },
    maxTimeline: { type: Date, required: true },
    startDate: { type: Date, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "tasks" }],
  },
  {
    timestamps: true,
  }
);

export default model<IGoal>("goals", goalSchema);
