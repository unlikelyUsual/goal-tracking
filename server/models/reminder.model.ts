import mongoose, { Document, model, Schema } from "mongoose";

export interface IReminder extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  time: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "tasks", required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "tasks", required: true },
    time: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IReminder>("reminders", reminderSchema);
