import mongoose, { Document, model, Schema } from "mongoose";

export interface IReminder extends Document {
  _id: string;
  taskId: mongoose.Types.ObjectId; // Reference to Task collection
  time: string; // Time for reminder
  autoSuggestion?: string; // Auto suggestion for reminder time
}

const reminderSchema = new Schema<IReminder>({
  taskId: { type: Schema.Types.ObjectId, ref: "tasks", required: true },
  time: { type: String, required: true },
  autoSuggestion: { type: String },
});

export default model<IReminder>("reminders", reminderSchema);
