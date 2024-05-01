import cron, { Patterns } from "@elysiajs/cron";
import { transporter } from "../config/mailer";
import ReminderModel from "../models/reminder.model";
import UserModel from "../models/User.model";
import Logger from "../utils/Logger";

const logger = new Logger("Reminder Cron");

const sendReminderNotification = async (email: string, task: string) => {
  try {
    const sent = await transporter.sendMail({
      from: "noreply@mail",
      to: email,
      subject: `Task Reminder : ${task}`,
      text: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reminder: ${task}</title>
        <style>
          /* Styles for better email formatting */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,.1);
          }
          h1, p {
            margin: 0 0 20px 0;
          }
        </style>
        </head>
        <body>
          <div class="container">
            <h1>Reminder: ${task}</h1>
            <p>Hello,</p>
            <p>This is a friendly reminder about ${task}. Please don't forget!</p>
            <p>Thank you.</p>
          </div>
        </body>
        </html>

      `,
    });
    return;
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
