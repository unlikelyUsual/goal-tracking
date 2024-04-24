import cron, { Patterns } from "@elysiajs/cron";
import ReminderModel from "../models/reminder.model";
import UserModel from "../models/User.model";
import Logger from "../utils/Logger";

const logger = new Logger("Reminder Cron");

const sendReminderNotification = (email: string, task: string) => {
  try {
    //1. Send out emails
  } catch (err) {
    logger.error(err);
  }
};

export default cron({
  name: "reminderCron",
  pattern: Patterns.everyMinute(),
  async run() {
    try {
      const reminders: any[] = await ReminderModel.find({
        time: { $gte: new Date(), $lt: new Date(Date.now() + 60000) },
      }).populate("taskId");

      for (const reminder of reminders) {
        const user = await UserModel.findById(reminder.userId);
        if (user) sendReminderNotification(user?.email, reminder.taskId.title);
      }

      return;
    } catch (error) {
      console.error("Error scheduling reminder notifications:", error);
    }
  },
});
