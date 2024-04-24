import { t, type Context } from "elysia";
import { auth } from "../middleware/auth";
import ReminderModel from "../models/reminder.model";
import TaskModel from "../models/task.model";
import { Http } from "../utils/Http";
import BaseController from "./baseController";

export default class TaskController extends BaseController {
  constructor() {
    super(TaskController.name);
  }

  private async getTasks(context: Context) {
    const { set, params } = context;
    try {
      const { goalId } = params as any;

      const tasks = await TaskModel.find({ goalId });

      return { data: { tasks } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async createReminder(context: Context) {
    const { body, set, headers } = context;
    try {
      const { uid } = headers;
      const { taskId, time } = body as any;

      const savedReminder = await new ReminderModel({
        userId: uid,
        taskId,
        time,
      }).save();

      return { data: { reminder: savedReminder } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async getReminders(context: Context) {
    const { set, params } = context;
    try {
      const { taskId } = params as any;

      const reminders = await ReminderModel.find({ taskId: taskId });

      return { data: { reminders } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async getReminder(context: Context) {
    const { set, params } = context;
    try {
      const { id } = params as any;

      const reminder = await ReminderModel.findById(id);

      if (!reminder)
        return this.returnError(set, "Reminder not found", Http.BAD);

      return { data: { reminder } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async updateReminder(context: Context) {
    const { body, set } = context;
    try {
      const { time, id } = body as any;

      const updateRes = await ReminderModel.findByIdAndUpdate(
        id,
        { $set: { time } },
        { new: true }
      );

      this.logger.log(`Updated res : `, updateRes);

      return { data: {} };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async deleteReminder(context: Context) {
    const { set, params } = context;
    try {
      const { id } = params as any;

      const deleteRes = await ReminderModel.deleteOne({ _id: id });

      this.logger.log(`Delete res`, deleteRes);

      return { data: {} };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.group("api/v1", (app) =>
      app
        .use(auth)
        .get("/task/:goalId", this.getTasks.bind(this))
        .post("/reminder", this.createReminder.bind(this), {
          body: t.Object({
            taskId: t.String(),
            time: t.Date(),
          }),
        })
        .get("/reminders/:taskId", this.getReminders.bind(this))
        .get("/reminder/:id", this.getReminder.bind(this))
        .put("/reminder/:id", this.updateReminder.bind(this))
        .delete("/reminder/:id", this.deleteReminder.bind(this))
    );
  }
}
